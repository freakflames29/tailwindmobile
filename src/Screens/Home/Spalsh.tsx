import { View, Text, ImageBackground, TouchableOpacity, Platform } from "react-native";
import React, { useEffect } from "react";
import tw from "../../lib/twrc";
import WorkingView from "../Components/WorkingView";
import { images } from "../../Model/Images";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import ScreenTypes, { ScreenParamsList } from "../../Model/ScreenTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { signInWithPassword, supabase } from "../../services/supabase";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { authActions } from "../../Adapter/redux/slices/authSlice";
import { StorageController } from "../../Adapter/Storage/StorageController";
import { PersistanceStorageKey } from "../../Adapter/Storage/PersistanceStorageKey";
import { User, Session } from "@supabase/supabase-js";
import AppButton from "../Components/AppButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const Spalsh = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ScreenParamsList>>();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const checkUserInfo = () => {
    const userInfo = StorageController.GET_DATA<User>(
      PersistanceStorageKey.USER_DETAILS
    );
    const sessionInfo = StorageController.GET_DATA<Session>(
      PersistanceStorageKey.SESSION_DETAILS
    );
    console.log("The VALUE", userInfo, sessionInfo);
    if (userInfo && sessionInfo) {
      dispatch(authActions.setAuth({ user: userInfo, session: sessionInfo }));

      navigation.reset({
        index: 0,
        routes: [
          {
            name: ScreenTypes.HOME,
          },
        ],
      });
    } else {
      navigation.navigate(ScreenTypes.SIGNIN);
    }
  };

  useEffect(() => {
    const keys = StorageController.GET_ALL_KEYS();
    console.log("The keys", keys);  
  }, []);

  return (
    <>
      <ImageBackground source={images.splashImage} style={[styles.imageBack]}>
        <StatusBar style="light" />
        <View style={[styles.card,{marginBottom:insets.bottom}]}>
          <Text style={styles.text}>
            Your personal app for tracking your daily activities.
          </Text>

  
          <TouchableOpacity style={styles.btn} onPress={() => checkUserInfo()}>
            <Text style={styles.btnText}>Let's Go</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = {
  imageBack: tw`flex-1 justify-end p-1`,
  card: tw` h-1/3
           bg-blue-900
            rounded-10
            p-7`,

  text: tw`text-white  tracking-wide ${Platform.OS=="ios"?"text-11":"text-12"} font-brunson`,
  btnText: tw`text-blue-900 text-4xl font-brunson  text-center`,
  btn: tw`p-3 bg-yellow-500 rounded-3 mt-3 border-2 `,
};

export default Spalsh;
