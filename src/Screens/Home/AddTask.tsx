import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useCallback, useRef } from "react";
import WorkingView from "../Components/WorkingView";
import H1Text from "../Components/H1Text";
import AppTextInput from "../Components/AppTextInput";
import { useFormik } from "formik";
import { addTaskSchema } from "../../Model/FormSchema";
import Blankspace from "../Components/Blankspace";
import AppButton from "../Components/AppButton";
import tw from "../../lib/twrc";
import AppDateTrigger from "../Components/AppDateTrigger";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import PillText from "../Components/PillText";
import { PillType, PriorityType, TaskDBType } from "../../Model/TaskData";
import moment from "moment";
import { useAppSelector } from "../../hooks/useAppSelector";
import { supabase } from "../../services/supabase";
import { ToastMessage } from "../../Adapter/Alert/ToastMessage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScreenParamsList } from "../../Model/ScreenTypes";
import { PostgrestError } from "@supabase/supabase-js";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { FlashList } from "@shopify/flash-list";

// defined outside component to prevent recreation on render
const AVAILABLE_PILLS: PillType[] = [
  "DO_IT_FIRST",
  "NEED_TO_DO_TODAY",
  "IMPORTANT",
];

const PRIORITY_OPTIONS: PriorityType[] = ["high", "mid", "low"];
const AddTask = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const authData = useAppSelector((state) => state.auth.user);
  const navigation = useNavigation<NavigationProp<ScreenParamsList>>();

  const priorityActionSheetRef = useRef<ActionSheetRef>(null);

  const addTask = async (payload: TaskDBType) => {
    try {
      formik.setSubmitting(true);
      const { data, error } = await supabase
        .from("tasks")
        .insert(payload)
        .select()
        .maybeSingle();

      if (error) {
        throw error as PostgrestError;
      }

      if (data) {
        console.log("🚀 Task added successfully:", data);
        ToastMessage.TOAST_SHORT_BOTTOM("Task added successfully");
        navigation.goBack();
      }
    } catch (error: PostgrestError | unknown) {
      console.log("🚀 Error adding task:", error);
      ToastMessage.TOAST_SHORT_BOTTOM(error?.message || "Something went wrong");
    } finally {
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
      pills: [] as PillType[],
      time: "",
      priority: "",
    },
    validationSchema: addTaskSchema,
    onSubmit: (values) => {
      const payload: TaskDBType = {
        user_id: authData?.id || "",
        title: values.title,
        priority: values.priority as PriorityType,
        due_date: values.date,
        due_time: values.time,
        tags: values.pills,
        is_completed: false,
      };

      console.log("🚀 Submitting Task payload>>>>:", payload);
      addTask(payload);
      // navigation.goBack();
    },
  });

  // ✅ Clean, Immutable Array Toggle Logic
  const togglePill = useCallback(
    (pill: PillType) => {
      const currentPills = formik.values.pills;
      let newPills: PillType[];

      if (currentPills.includes(pill)) {
        // Remove: Filter out the clicked pill
        newPills = currentPills.filter((p) => p !== pill);
      } else {
        // Add: Spread existing + new pill
        newPills = [...currentPills, pill];
      }

      formik.setFieldValue("pills", newPills);
    },
    [formik.values.pills]
  );

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    if (event.type === "set" && date) {
      console.log("🚀 userDate:", date);
      const userDate = date.toISOString().split("T")[0];
      formik.setFieldValue("date", userDate);
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, time: any) => {
    setShowTimePicker(false);
    if (event.type === "set" && time) {
      // console.log("🚀 userTime:", time);
      const userTime = moment(time).format("h:mm A");
      console.log("🚀 userTime:", userTime);
      formik.setFieldValue("time", userTime);
    }
  };

  const handlePriorityChange = (priority: PriorityType) => {
    formik.setFieldValue("priority", priority);
    priorityActionSheetRef.current?.hide();
  };

  const priorityColor = (priority: PriorityType) => {
    switch (priority) {
      case "high":
        return "border-red-500";
      case "mid":
        return "border-yellow-500";
      case "low":
        return "border-green-500";
    }
  };
  const priorityTextColor = (priority: PriorityType) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "mid":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
    }
  };

  return (
    <WorkingView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={tw`flex-grow pb-10`}
        showsVerticalScrollIndicator={false}
      >
        <H1Text title="Create Seva" style="mb-5 text-blue-500 text-5xl" />

        <ActionSheet ref={priorityActionSheetRef}>
          <View style={tw`px-4 py-8 flex-row w-full gap-2 justify-center`}>
            {PRIORITY_OPTIONS.map((item) => (
              <TouchableOpacity
                onPress={() => handlePriorityChange(item)}
                style={tw`text-xl w-1/4 capitalize font-urb-bold text-gray-700 mb-3 border border-black-300 ${priorityColor(
                  item
                )} p-4 rounded-xl`}
              >
                <Text
                  style={tw`${priorityTextColor(
                    item
                  )} capitalize text-center font-urb-bold`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ActionSheet>

        {showDatePicker && (
          <RNDateTimePicker
            onChange={handleDateChange}
            value={
              formik.values.date ? new Date(formik.values.date) : new Date()
            }
            mode="date"
            display="compact"
          />
        )}

        {showTimePicker && (
          <RNDateTimePicker
            onChange={handleTimeChange}
            value={
              formik.values.date ? new Date(formik.values.date) : new Date()
            }
            mode="time"
            display="default"
          />
        )}

        <AppTextInput
          label="What needs to be done?"
          placeholder="What needs to be done?"
          error={formik.errors.title}
          touched={formik.touched.title}
          onChangeText={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          value={formik.values.title}
        />

        <Blankspace height={1} />

        <AppDateTrigger
          label="Due Date"
          placeholder="Select Date"
          value={formik.values.date}
          error={formik.errors.date}
          touched={formik.touched.date}
          onPress={() => {
            Keyboard.dismiss();
            setShowDatePicker(true);
          }}
        />

        <Blankspace height={2} />
        <AppDateTrigger
          label="When to do"
          placeholder="Select Time"
          value={formik.values.time}
          error={formik.errors.time}
          touched={formik.touched.time}
          type="time"
          onPress={() => {
            Keyboard.dismiss();
            setShowTimePicker(true);
          }}
        />

        <Blankspace height={2} />
        <AppDateTrigger
          label="Priority"
          placeholder="Select Priority"
          value={formik.values.priority}
          error={formik.errors.priority}
          touched={formik.touched.priority}
          type="priority"
          onPress={() => {
            Keyboard.dismiss();
            priorityActionSheetRef.current?.show();
          }}
        />

        <Blankspace height={2} />

        <Text style={tw`text-xl font-urb-bold text-gray-700 mb-3`}>
          Importance Level
        </Text>

        <View style={tw`flex-row flex-wrap`}>
          {AVAILABLE_PILLS.map((pill) => (
            <PillText
              key={pill}
              type={pill}
              showTick={true}
              // The array is the Single Source of Truth
              isSelected={formik.values.pills.includes(pill)}
              // Simple toggle handler
              onToggle={() => togglePill(pill)}
            />
          ))}
        </View>

        {formik.touched.pills && formik.errors.pills && (
          <Text style={tw`text-red-500 text-xs font-urb-reg mt-2 ml-1`}>
            {/* Formik errors for arrays can sometimes be strings or arrays, casting to string for safety */}
            {String(formik.errors.pills)}
          </Text>
        )}

        <Blankspace height={4} />

        <AppButton
          title="Create Seva"
          bgColor="bg-blue-500"
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
          onPress={formik.handleSubmit as any} // Formik type casting for RN
        />
      </ScrollView>
    </WorkingView>
  );
};

export default AddTask;
