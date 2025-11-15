import { View, Text, ViewStyle } from "react-native";
import React from "react";
import tw from "../../lib/twrc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

interface WorkingViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const WorkingView: React.FC<WorkingViewProps> = ({ children, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Top safe area with red background */}
      <View style={{ height: insets.top, backgroundColor: "white" }} />

      <StatusBar style="dark"/>

      {/* Main content */}
      <View style={[tw`flex-1 p-3 bg-white`, style]}>
        {children}
      </View>
    </View>
  );
};
export default WorkingView;