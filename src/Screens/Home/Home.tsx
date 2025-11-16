import { View, Text, FlatList } from "react-native";
import React from "react";
import tw from "../../lib/twrc";
import WorkingView from "../Components/WorkingView";
import TaskCard from "../Components/TaskCard";
import AppButton from "../Components/AppButton";
import { TaskData } from "../../Model/TaskData";

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
  return (
    <WorkingView>
      <View style={styles.container}>
        <Text style={styles.date}>Wed 16 May, 2025</Text>
        <Text style={styles.hareKrishna}>Hare Krishna 🪷</Text>
        <Text style={styles.greeting}>Good Afternoon</Text>
      </View>

      <AppButton title="Add Task" bgColor="bg-blue-500" />
      <View style={tw`my-2`} />

      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`gap-3 mb-20 pb-20`}
        renderItem={({ item }) => {
          return (
            <TaskCard
              type={item.type}
              title={item.title}
              date={item.date}
              pills={item.pills}
            />
          );
        }}
      />
      {/* <TaskCard type="high" /> */}
    </WorkingView>
  );
};

const styles = {
  container: tw`mb-5`,
  hareKrishna: tw`text-blue-500 text-5xl font-brunson`,
  greeting: tw`text-gray-600 text-xl font-urb-reg `,
  date: tw`text-gray-500 text-sm font-urb-reg `,
};

export default Home;
