import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Test from "./src/Screens/Test";
import { FontProvider } from "./src/Adapter/FontProvider";
import NavigationWrapper from "./src/Adapter/Navigation/NavigationWrapper";
import tw from "./src/lib/twrc";
import { Provider } from "react-redux";
import { store } from "./src/Adapter/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <Provider store={store}>
      <FontProvider>
        <GestureHandlerRootView style={{flex:1}}>
          <View style={styles.container}>
            <StatusBar style="dark" />
            {/* <Test /> */}
            <NavigationWrapper />
          </View>
        </GestureHandlerRootView>
      </FontProvider>
    </Provider>
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
