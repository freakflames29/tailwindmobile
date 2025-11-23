import * as yup from "yup";

// add task validation schema
export const addTaskSchema = yup.object({
  title: yup.string().required("Title is required"),
  date: yup.string().required("Date is required"),
  pills: yup.array().min(1, "Please select importance").required(),
  time: yup.string().required("Time is required"),
  priority: yup.string().required("Priority is required"),
  // description: yup.string().required("Description is required"),
});


// signin validation schema
export const signinSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
