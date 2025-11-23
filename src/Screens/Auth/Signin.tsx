import { View, Text } from "react-native";
import React from "react";
import WorkingView from "../Components/WorkingView";
import H1Text from "../Components/H1Text";
import { useFormik } from "formik";
import { signinSchema } from "../../Model/FormSchema";
import AppTextInput from "../Components/AppTextInput";
import Blankspace from "../Components/Blankspace";
import AppButton from "../Components/AppButton";
import { signInWithPassword } from "../../services/supabase";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { authActions } from "../../Adapter/redux/slices/authSlice";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ScreenTypes, { ScreenParamsList } from "../../Model/ScreenTypes";
import { ToastMessage } from "../../Adapter/Alert/ToastMessage";
import { StorageController } from "../../Adapter/Storage/StorageController";
import { PersistanceStorageKey } from "../../Adapter/Storage/PersistanceStorageKey";

const Signin = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<ScreenParamsList>>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit: async (values) => {
      console.log("Sigin in values>>>>>", values);
      siginHandler();
    },
  });
  const siginHandler = async () => {
    try {
      formik.setSubmitting(true);
      const { data, error } = await signInWithPassword(
        formik.values.email,
        formik.values.password
      );
      if (error) {
        throw new Error(error.message);
      } else {
        dispatch(
          authActions.setAuth({ user: data.user, session: data.session })
        );
        StorageController.SET_DATA(
          PersistanceStorageKey.USER_DETAILS,
          data.user
        );
        StorageController.SET_DATA(
          PersistanceStorageKey.SESSION_DETAILS,
          data.session
        );
        console.log("Sigin in success", data);
        ToastMessage.TOAST_SHORT_BOTTOM("Sigin in success");
        navigation.reset({
          index: 0,
          routes: [
            {
              name: ScreenTypes.HOME,
            },
          ],
        });
      }
    } catch (error: any) {
      console.log("Error in sigin in", error);
      ToastMessage.TOAST_SHORT_BOTTOM(error.message);
    } finally {
      formik.setSubmitting(false);
    }
  };
  return (
    <WorkingView>
      <H1Text title="Sigin in" style="text-6xl text-blue-500" />
      <Blankspace height={5} />
      <AppTextInput
        label="Email"
        placeholder="Email"
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        touched={formik.touched.email}
        error={formik.errors.email}
      />

      <AppTextInput
        label="Password"
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        touched={formik.touched.password}
        error={formik.errors.password}
      />
      <Blankspace height={5} />
      <AppButton
        title="Signin"
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
        disabled={formik.isSubmitting}
      />
    </WorkingView>
  );
};

export default Signin;
