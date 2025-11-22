import {
  View,
  Text,
  Pressable,
} from "react-native";
import React from "react";
import tw from "../../lib/twrc"; // Adjust path as needed
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface AppDateTriggerProps {
  label?: string;
  value?: string | Date | null;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  onPress?: () => void;
  containerStyle?: string;
  contentStyle?: string; // Style for the inner box
  icon?: React.ReactNode;
  labelStyle?: string;
}

const AppDateTrigger: React.FC<AppDateTriggerProps> = ({
  label,
  value,
  placeholder = "Select Date",
  error,
  touched,
  onPress,
  containerStyle,
  contentStyle,
  icon,
  labelStyle,
}) => {
  // Logic: Error -> Default (No Focus state needed for buttons usually, but could add pressed state)
  const getBorderColor = (pressed: boolean) => {
    if (touched && error) return tw`border-red-500 bg-red-50`;
    if (pressed) return tw`border-yellow-500 bg-yellow-50`; // Visual feedback on press
    return tw`border-gray-200 bg-gray-50 ease-linear`;
  };

  // Helper to display date string or placeholder
  const displayValue = value ? value.toString() : placeholder;
  const textColor = value ? tw`text-gray-800` : tw`text-gray-400`;

  return (
    <View
      style={[styles.container, tw`${containerStyle ? containerStyle : ""}`]}
    >
      {label && (
        <Text style={[styles.label, tw`${labelStyle ? labelStyle : ""}`]}>
          {label}
        </Text>
      )}

      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.triggerBase,
          getBorderColor(pressed),
          tw`${contentStyle ? contentStyle : ""}`,
        ]}
      >
        {/* Optional Icon slot (Left side) */}
        {icon ? (
          <View style={tw`mr-3`}>{icon}</View>
        ) : (
          <FontAwesome
            name="calendar"
            size={20}
            color={value ? "#4b5563" : "#9ca3af"}
            style={tw`mr-3`}
          />
        )}

        <Text style={[styles.textBase, textColor]}>{displayValue}</Text>

        {/* Chevron indicating dropdown/action (Right side) */}
        <View style={tw`ml-auto`}>
          <FontAwesome
            name="chevron-down"
            size={12}
            color={tw.color("text-gray-400")}
          />
        </View>
      </Pressable>

      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = {
  container: tw`w-full mb-3`,
  label: tw`text-gray-600 text-sm font-urb-reg mb-1.5 ml-1`,
  // Merging your requested style: p-7, items-center, w-full, bg-gray-50, rounded-xl, border
  triggerBase: tw`flex-row items-center w-full p-5 rounded-xl border border-gray-200`,
  // Note: I reduced p-7 to p-5 to better match standard inputs,
  // but you can pass tw`p-7` in contentStyle prop to override.

  textBase: tw`font-urb-reg text-base`,
  errorText: tw`text-red-500 text-xs font-urb-reg mt-1 ml-1`,
};

export default AppDateTrigger;
