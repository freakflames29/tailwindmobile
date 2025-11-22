import { View, Text, TextInput, TextInputProps } from "react-native";
import React, { useState, forwardRef } from "react";
import tw from "../../lib/twrc";
interface AppTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  touched?: boolean;
  containerStyle?: string;
  inputStyle?: string;
  labelStyle?: string;
}

const AppTextInput = forwardRef<TextInput, AppTextInputProps>(
  (
    { label, error, touched, containerStyle, inputStyle, labelStyle, ...props },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: any) => {
      setIsFocused(false);
      if (props.onBlur) props.onBlur(e);
    };

    // Logic: Error -> Focus -> Default
    const getBorderColor = () => {
      if (touched && error) return tw`border-red-500 bg-red-50`;
      if (isFocused) return tw`border-yellow-500 bg-yellow-50 border-2`;
      return tw`border-gray-200 bg-gray-50`;
    };

    return (
      <View
        style={[styles.container, tw`${containerStyle ? containerStyle : ""}`]}
      >
        {label && (
          <Text style={[styles.label, tw`${labelStyle ? labelStyle : ""}`]}>
            {label}
          </Text>
        )}

        <TextInput
          ref={ref}
          style={[
            styles.inputBase,
            getBorderColor(),
            tw`${inputStyle ? inputStyle : ""}`,
          ]}
          placeholderTextColor={tw.color("text-gray-400")}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {touched && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

const styles = {
  container: tw`w-full mb-3`,
  label: tw`text-gray-600 text-sm font-urb-reg mb-1.5 ml-1`,
  inputBase: tw`w-full p-4 rounded-xl border border-gray-200 font-urb-reg text-gray-800 text-base`,
  errorText: tw`text-red-500 text-xs font-urb-reg mt-1 ml-1`,
};

export default AppTextInput;
