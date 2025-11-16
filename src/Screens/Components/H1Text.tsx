import { View, Text } from "react-native";
import React from "react";
import tw from "../../lib/twrc";

interface H1Props {
  title: string;
  style?: string;
}

const H1Text: React.FC<H1Props> = ({ title, style }) => {
  return (
    <Text style={tw`text-4xl font-brunson ${style ? style : ""}`}>{title}</Text>
  );
};

export default H1Text;
