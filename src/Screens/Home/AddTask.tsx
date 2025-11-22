import { View, Text } from "react-native";
import React, { useState } from "react";
import WorkingView from "../Components/WorkingView";
import H1Text from "../Components/H1Text";
import AppTextInput from "../Components/AppTextInput";
import { useFormik } from "formik";
import { addTaskSchema } from "../../Model/FormSchema";
import Blankspace from "../Components/Blankspace";
import AppButton from "../Components/AppButton";

const AddTask = () => {
  const [text, setText] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
    },
    validationSchema: addTaskSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <WorkingView>
      <H1Text title={`Add Task`} style={`my-3`} />

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

      <AppTextInput
        label="Task Date"
        placeholder="Date"
        labelStyle={`text-1xl font-urb-bold`}
        error={formik.errors.date}
        touched={formik.touched.date}
        onChangeText={formik.handleChange("date")}
        onBlur={formik.handleBlur("date")}
        value={formik.values.date}
      />
      <Blankspace height={1} />
      <AppButton
        title="Add Task"
        bgColor="bg-blue-500"
        onPress={formik.handleSubmit}
      />
    </WorkingView>
  );
};

export default AddTask;
