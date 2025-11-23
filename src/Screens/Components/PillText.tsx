import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "../../lib/twrc";
import { PillType } from "../../Model/TaskData";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface PillProps {
  type: PillType;
  onPress?: () => void;
  showTick?: boolean;
  isSelected?: boolean;
  onToggle?: (selected: boolean) => void;
}

const PillText: React.FC<PillProps> = ({
  type,
  onPress,
  showTick = false,
  isSelected = false,
  onToggle,
}) => {
  const [selected, setSelected] = useState(isSelected);

  const toggleSelection = () => {
    if (onToggle) {
      const newState = !selected;
      setSelected(newState);
      onToggle(newState);
    }
    if (onPress) onPress();
  };

  const bg =
    type === "DO_IT_FIRST"
      ? selected
        ? "bg-red-500"
        : "bg-red-500"
      : type === "IMPORTANT"
      ? selected
        ? "bg-yellow-400"
        : "bg-yellow-400"
      : selected
      ? "bg-green-600"
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
      onPress={toggleSelection}
      style={[styles.container, tw`${bg}`]}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {showTick && (
          <View style={tw`mr-2`}>
            <FontAwesome
              name={selected ? "check-circle" : undefined}
              size={18}
              color={"white"}
            />
          </View>
        )}
        <Text style={[styles.text, tw`${color}`]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  container: tw`rounded-full px-4 py-2 m-1 border-2`,
  content: tw`flex-row items-center`,
  text: tw`font-urb-medium text-sm`,
} as const;

export default PillText;
