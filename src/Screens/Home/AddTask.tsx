import { View, Text, ScrollView } from "react-native";
import React, { useState, useCallback } from "react";
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
import { PillType } from "../../Model/TaskData";
import moment from "moment";

// defined outside component to prevent recreation on render
const AVAILABLE_PILLS: PillType[] = [
  "DO_IT_FIRST",
  "NEED_TO_DO_TODAY",
  "IMPORTANT",
];

const AddTask = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
      pills: [] as PillType[],
      time: "",
    },
    validationSchema: addTaskSchema,
    onSubmit: (values) => {
      console.log("🚀 Submitting Task:", values);
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

  const handleTimeChange = (event: DateTimePickerEvent, time:any) => {
    setShowTimePicker(false);
    if (event.type === "set" && time) {
      // console.log("🚀 userTime:", time);
      const userTime = moment(time).format("h:mm A");
      console.log("🚀 userTime:", userTime);
      formik.setFieldValue("time", userTime);
    }
  };

  return (
    <WorkingView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={tw`flex-grow pb-10`}
        showsVerticalScrollIndicator={false}
      >
        <H1Text title="Add Task" style="mb-5 text-blue-500 text-5xl" />

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
          onPress={() => setShowDatePicker(true)}
        />

        <Blankspace height={2} />
        <AppDateTrigger
          label="When to do"
          placeholder="Select Time"
          value={formik.values.time}
          error={formik.errors.time}
          touched={formik.touched.time}
          type="time"
          onPress={() => setShowTimePicker(true)}
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
          title="Create Task"
          bgColor="bg-blue-500"
          onPress={formik.handleSubmit as any} // Formik type casting for RN
        />
      </ScrollView>
    </WorkingView>
  );
};

export default AddTask;
