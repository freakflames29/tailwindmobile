import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
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
const AddTask = () => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
    },
    validationSchema: addTaskSchema,
    onSubmit: (values) => {
      console.log("Form Values>>>>>", values);
    },
  });

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShow(false);
    if (date) {
      const userDate = date.toISOString().split("T")[0];
      console.log("====================================");
      console.log("User Date", userDate);
      console.log("====================================");
      formik.setFieldValue("date", userDate);
    }
  };

  return (
    <WorkingView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={tw`flex-grow-1`}
      >
        <H1Text title={`Add Task`} style={`my-3`} />

        {show && (
          <RNDateTimePicker
            onChange={(event, date) => handleDateChange(event, date)}
            value={new Date()}
            mode="date"
            display="default"
          />
        )}
        <AppTextInput
          label="Task Title"
          placeholder="Task"
          labelStyle={`text-1xl font-urb-bold`}
          error={formik.errors.title}
          touched={formik.touched.title}
          onChangeText={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          value={formik.values.title}
        />
        <Blankspace height={1} />

        <AppDateTrigger
          label="Task Date"
          labelStyle={`text-1xl font-urb-bold`}
          value={formik.values.date}
          error={formik.errors.date}
          touched={formik.touched.date}
          onPress={() => setShow(true)}
        />

        <Blankspace height={2} />
        <AppButton
          title="Add Task"
          bgColor="bg-blue-500"
          onPress={formik.handleSubmit}
        />
      </ScrollView>
    </WorkingView>
  );
};

export default AddTask;
