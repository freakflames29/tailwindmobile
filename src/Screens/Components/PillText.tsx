import { Text } from "react-native";
import React from "react";
import tw from "../../lib/twrc";

interface PillProps {
  pillColor?: string;
  pillTextColor?: string;
  onPress?: () => void;
  text:string
}

const PillText: React.FC<PillProps> = ({
  pillColor = "bg-red-500",
  pillTextColor = "text-white",
  onPress,
  text
}) => {
  return (
    <Text
      onPress={onPress}
      style={tw`px-5 py-1 text-lg rounded-full text-center ${pillColor} ${pillTextColor}`}
    >
    {text}
    </Text>
  );
};

export default PillText;
