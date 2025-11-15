import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Test from "./src/Screens/Test";
import { FontProvider } from "./src/Adapter/FontProvider";

export default function App() {
  return (
    <FontProvider>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Test />
      </View>
    </FontProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
