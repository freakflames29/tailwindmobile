import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Test from "./src/Screens/Test";
import { FontProvider } from "./src/Adapter/FontProvider";
import NavigationWrapper from "./src/Adapter/Navigation/NavigationWrapper";
import tw from "./src/lib/twrc";

export default function App() {
  return (
    <FontProvider>
      <View style={styles.container}>
        <StatusBar style="dark"  />
        {/* <Test /> */}
        <NavigationWrapper />
      </View>
    </FontProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
