import * as yup from "yup";

// add task validation schema
export const addTaskSchema = yup.object({
  title: yup.string().required("Title is required"),
  date: yup.string().required("Date is required"),
  // description: yup.string().required("Description is required"),
});
