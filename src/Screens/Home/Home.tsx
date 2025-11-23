import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import tw from "../../lib/twrc";
import WorkingView from "../Components/WorkingView";
import TaskCard from "../Components/TaskCard";
import AppButton from "../Components/AppButton";
import { TaskData, TaskDBType } from "../../Model/TaskData";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import H1Text from "../Components/H1Text";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ScreenTypes, { ScreenParamsList } from "../../Model/ScreenTypes";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { supabase } from "../../services/supabase";
import { supabaseTable } from "../../Model/appData";
import { RefreshControl } from "react-native-gesture-handler";
import { StorageController } from "../../Adapter/Storage/StorageController";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { clearRedux } from "../../Adapter/redux/store";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { images } from "../../Model/Images";
import { formatDate, getFormattedToday } from "../../lib/genutils";
import { ToastMessage } from "../../Adapter/Alert/ToastMessage";
const dummyData: TaskData[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Description 1",
    type: "high",
    date: "2025-05-16",
    pills: ["IMPORTANT", "DO_IT_FIRST"],
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description 2",
    type: "low",
    date: "2025-05-16",
    pills: ["IMPORTANT", "DO_IT_FIRST", "NEED_TO_DO_TODAY"],
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description 3",
    type: "mid",
    date: "2025-05-16",
    pills: ["IMPORTANT", "NEED_TO_DO_TODAY"],
  },
];

const Home = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const userData = useAppSelector((state) => state.auth.user);
  const [taskData, setTaskData] = useState<TaskDBType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  const [selectdTask, setSelectedTask] = useState<TaskDBType | null>(null);
  const [isDoneLoading, setIsDoneLoading] = useState(false);
  const dispatch = useAppDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<ScreenParamsList>>();

  const handleLongPress = (task: TaskDBType) => {
    // console.log("Long Pressed");
    actionSheetRef.current?.show();
    console.log("Selected Task", task);
    setSelectedTask(task);
  };

  const fetchTask = async () => {
    try {
      setTaskLoading(true);
      const { data, error } = await supabase
        .from(supabaseTable.tasks)
        .select("*")
        .order("created_at", { ascending: false })
        .eq("is_completed", false)
        .eq("user_id", userData?.id);

      if (error) {
        throw error;
      }

      if (data) {
        console.log("🚀 Task fetched successfully:", data);
        setTaskData(data);
      }
    } catch (e) {
      console.log("🚀 Error fetching task:", e);
    } finally {
      setTaskLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchTask();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      console.log("🚀 Focus");
      fetchTask();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTask(); // Reuse your existing fetchTask function
    setRefreshing(false);
  }, []);

  const taskDoneHandler = async (taskId: string) => {
    try {
      setIsDoneLoading(true);
      const { error } = await supabase
        .from(supabaseTable.tasks)
        .update({ is_completed: true })
        .eq("user_id", userData?.id)
        .eq("id", taskId);

      if (!error) {
        ToastMessage.TOAST_SHORT_BOTTOM("Task Completed successfully");
        actionSheetRef.current?.hide();
        fetchTask();
      }
      if (error) {
        // ToastMessage.TOAST_SHORT_BOTTOM("Something went wrong doing done");
        throw error;
      }
    } catch (e) {
      console.log("🚀 Error fetching task:", e);
      ToastMessage.TOAST_SHORT_BOTTOM("Something went wrong doing done");
    } finally {
      setIsDoneLoading(false);
    }
  };

  if (taskLoading) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <H1Text title="Loading..." />
      </View>
    );
  }

  const listEmptyComponent = () => {
    return (
      <View style={tw`flex-1 items-center justify-center `}>
        <Image source={images.notask} style={tw`w-40 h-40 `} />
        <H1Text title="Seems like you have no tasks!" style="text-slate-400 font-urb-bold text-2xl"/>
      </View>
    );
  };

  return (
    <WorkingView>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={tw`h-1/4 p-4 items-center`}
      >
        <H1Text title="Seva Done ?" style={`text-center my-3`} />
        <View style={tw`flex-row gap-2 mt-2 w-1/2 items-center`}>
          <AppButton
            title="Not Done"
            bgColor="bg-red-500"
            onPress={() => actionSheetRef.current?.hide()}
          />
          <AppButton
            title="Done"
            bgColor="bg-green-500"
            loading={isDoneLoading}
            onPress={() => {
              taskDoneHandler(selectdTask?.id!);
            }}
            icon={<FontAwesome name="check" size={24} color="white" />}
          />
        </View>
      </ActionSheet>

      <View style={styles.container}>
        <View style={styles.leftSection}>
          <Text style={styles.date}>{getFormattedToday()}</Text>
          <Text style={styles.hareKrishna}>Hare krishna!🪷</Text>
        </View>
        <TouchableOpacity
          style={tw`w-1/5 items-center justify-center`}
          onPress={() => navigation.navigate(ScreenTypes.PROFILE)}
        >
          <Image
            source={images.profile}
            resizeMode="cover"
            style={tw`w-12 h-12 rounded-full`}
          />
        </TouchableOpacity>
        {/* <Text style={styles.greeting}>Good Afternoon</Text> */}
      </View>

      <TouchableOpacity
        style={styles.addTaskBtn}
        onPress={() => navigation.navigate(ScreenTypes.ADD_TASK)}
      >
        <FontAwesome6 name="add" size={24} color="white" />
      </TouchableOpacity>
      {/* <AppButton
        title="Add Task"
        bgColor="bg-blue-500"
        onPress={() => navigation.navigate(ScreenTypes.ADD_TASK)}
      /> */}
      {/* <AppButton title="Logout" bgColor="bg-red-500 my-2" onPress={logout} /> */}
      <View style={tw`my-2`} />

      <FlashList
        data={taskData}
        keyExtractor={(item) => item.id!!}
        contentContainerStyle={tw`gap-3 mb-20 pb-20 flex-grow-1`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="blue"
            colors={["#3b82f6"]} // Blue color for the refresh indicator
          />
        }
        renderItem={({ item }) => {
          return (
            <TaskCard
              type={item.priority}
              title={item.title}
              date={formatDate(item.due_date)}
              time={item.due_time}
              pills={item.tags}
              onLongPress={() => handleLongPress(item)}
            />
          );
        }}
        ListEmptyComponent={listEmptyComponent}
      />
      {/* <TaskCard type="high" /> */}
    </WorkingView>
  );
};

const styles = {
  container: tw`mb-1 w-full flex-row`,
  leftSection: tw`w-4/5`,
  hareKrishna: tw`text-blue-500 text-5xl font-brunson`,
  greeting: tw`text-gray-600 text-xl font-urb-reg `,
  date: tw`text-gray-500 text-sm font-urb-reg `,
  addTaskBtn: tw`w-20 h-20 bg-blue-500 border-2  rounded-full items-center justify-center absolute bottom-10 right-8 z-10`,
};

export default Home;
