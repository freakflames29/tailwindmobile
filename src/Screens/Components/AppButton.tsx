import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from "react-native";
import React from "react";
import tw from "../../lib/twrc";

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  bgColor?: string;       // bg-blue-500, bg-yellow-400 etc.
  textColor?: string;     // text-white, text-black etc.
  rounded?: string;       // rounded-3, rounded-full etc.
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  bgColor = "bg-blue-600",
  textColor = "text-white",
  rounded = "rounded-4",
  fullWidth = true,
  size = "md",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        tw`${bgColor} ${rounded}`,
        fullWidth ? tw`w-full` : tw`self-start`,
        size === "sm" && styles.sm,
        size === "md" && styles.md,
        size === "lg" && styles.lg,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.text, tw`${textColor}`]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = {
  base: tw`justify-center items-center`,
  text: tw`text-lg font-urb-bold`,
  
  // Sizes
  sm: tw`py-3 px-3`,
  md: tw`py-4 px-4`,
  lg: tw`py-5 px-5`,

  disabled: tw`opacity-50`,
};

export default AppButton;
