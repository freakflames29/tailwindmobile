import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../lib/twrc";
import { FontsVariant } from "../Adapter/FontProvider";
const Test = () => {
  const [invalid, setInvalid] = React.useState(false);

  return (
    <View style={[tw`flex-1 justify-center p-3 bg-primary`]}>
      <Text style={tw`text-6xl text-red-600  font-brunson`}>
        Tailwind Fun
      </Text>
      <Text style={[tw`text-4xl  text-blue-500 tracking-tighter font-urb-reg`]}>
        Sourav
      </Text>

      <View style={tw`flex-row  gap-1`}>
        <TouchableOpacity
          style={[tw`bg-blue-500 text-white rounded-5 px-4 py-5 my-10 justify-center w-1/2`]}
          onPress={() => {
            setInvalid(!invalid);
          }}
        >
          <Text style={tw`text-white text-5x font-bold  text-center`}>
            Click Me
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw`bg-green-900 text-white rounded-6 px-4 py-5 my-10 w-1/2`]}
          onPress={() => {
            setInvalid(!invalid);
          }}
        >
          <Text style={tw`text-white text-2xl font-bold  text-center`}>
            Tap me
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={tw.style(
          "text-md text-3xl text-green-600",
          invalid && "text-red-500"
        )}
      >
        Hello
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Test;
