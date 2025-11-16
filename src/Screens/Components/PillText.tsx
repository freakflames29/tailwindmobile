import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../../lib/twrc";
import { PillType } from "../../Model/TaskData";

interface PillProps {
  type: PillType;
  onPress?: () => void;
}

const PillText: React.FC<PillProps> = ({ type, onPress }) => {
  const bg =
    type === "DO_IT_FIRST"
      ? "bg-red-500"
      : type === "IMPORTANT"
      ? "bg-yellow-400"
      : "bg-green-600";

  const color = type === "IMPORTANT" ? "text-black" : "text-white";
  const text =
    type === "DO_IT_FIRST"
      ? "Do It First"
      : type === "IMPORTANT"
      ? "Important"
      : "Need To Do Today";
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, tw`${bg}`]}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Text style={[styles.text, tw`${color}`]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  container: tw`
    px-4 
    py-2 
    rounded-full 
    self-start
  `,
  content: tw`
    flex-row 
    items-center 
    justify-center
  `,
  icon: tw`mr-2`,
  text: tw`text-lg font-bold`,
};

export default PillText;
