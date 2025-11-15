import { View, Text } from "react-native";
import React from "react";
import tw from "../../lib/twrc";


interface WorkingViewProps {
  children: React.ReactNode;
}

const WorkingView: React.FC<WorkingViewProps> = ({ children }) => {
  return <View style={tw`flex-1 p-3`}>{children}</View>;
};

export default WorkingView;
