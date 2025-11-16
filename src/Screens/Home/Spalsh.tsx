import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../../lib/twrc";
import WorkingView from "../Components/WorkingView";
import { images } from "../../Model/Images";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import ScreenTypes from "../../Model/ScreenTypes";

const Spalsh = () => {
  const navigation: any = useNavigation();

  return (
    <>
      <ImageBackground source={images.splashImage} style={styles.imageBack}>
        <StatusBar style="light" />
        <View style={styles.card}>
          <Text style={styles.text}>
            Your personal app for tracking your daily activities.
          </Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate(ScreenTypes.HOME)}
          >
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

  text: tw`text-white  tracking-wide text-12 font-brunson`,
  btnText: tw`text-blue-900 text-4xl font-brunson  text-center`,
  btn: tw`p-3 bg-yellow-500 rounded-3 mt-3`,
};

export default Spalsh;
