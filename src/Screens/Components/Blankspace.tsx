import { View, Text } from "react-native";
import React from "react";
import tw from "../../lib/twrc";

interface BlankspaceProps {
  height?: number;
}

const Blankspace = ({ height }: BlankspaceProps) => {
  return <View style={tw`h-${height ? height : 1}`} />;
};

export default Blankspace;
