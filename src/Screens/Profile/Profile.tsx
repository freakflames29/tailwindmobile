import { View, Text, Image } from "react-native";
import React from "react";
import WorkingView from "../Components/WorkingView";
import H1Text from "../Components/H1Text";
import { images } from "../../Model/Images";
import tw from "../../lib/twrc";
import AppButton from "../Components/AppButton";
import { StorageController } from "../../Adapter/Storage/StorageController";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { clearRedux } from "../../Adapter/redux/store";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import ScreenTypes, { ScreenParamsList } from "../../Model/ScreenTypes";
const Profile = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<ScreenParamsList>>();
  const logout = () => {
    StorageController.CLEAR_ALL();
    dispatch(clearRedux());
    navigation.reset({
      index: 0,
      routes: [
        {
          name: ScreenTypes.SPALSH,
        },
      ],
    });
  };
  return (
    <WorkingView>
      <H1Text title="Profile" style={`text-blue-500 mb-5`} />
      <View style={tw`flex items-center`}>
        <Image source={images.profile} style={tw`w-40 h-40 rounded-full`} />
      </View>
      <View style={tw`flex items-center`}>
        <Text style={tw`text-blue-500 my-4 text-center text-3xl font-urb-bold`}>
          Sourav Das
        </Text>
      </View>
      <AppButton title="Logout" bgColor="bg-red-500" onPress={logout} />
    </WorkingView>
  );
};

export default Profile;
