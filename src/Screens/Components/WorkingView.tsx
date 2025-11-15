import { View, Text, ViewStyle,StatusBar } from "react-native";
import React from "react";
import tw from "../../lib/twrc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";

interface WorkingViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const WorkingView: React.FC<WorkingViewProps> = ({ children, style }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[tw`flex-1 p-3`, style, { marginTop: insets.top }]}>
      <StatusBar translucent barStyle={"dark-content"}/>
      {children}
    </View>
  );
};

export default WorkingView;
