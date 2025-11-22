import { View, Text, ViewStyle } from "react-native";
import React from "react";
import tw from "../../lib/twrc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

interface WorkingViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const WorkingView: React.FC<WorkingViewProps> = ({ children, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Top safe area with red background */}
      <View
        style={{
          height: insets.top,
          backgroundColor: "rgba(145, 200, 228,0.1)",
        }}
      />

      <StatusBar style="dark" translucent />
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(145, 200, 228,0.1)", "transparent"]}
        style={tw`flex-1 p-4`}
      >
        {/* Main content */}
        {children}
      </LinearGradient>
    </View>
  );
};
export default WorkingView;
