import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Spalsh from "../../Screens/Home/Spalsh";
import ScreenTypes from "../../Model/ScreenTypes";
import Home from "../../Screens/Home/Home";
import AddTask from "../../Screens/Home/AddTask";
import Signin from "../../Screens/Auth/Signin";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenTypes.SPALSH}
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name={ScreenTypes.SPALSH} component={Spalsh} />
      <Stack.Screen name={ScreenTypes.HOME} component={Home} />
      <Stack.Screen name={ScreenTypes.ADD_TASK} component={AddTask} />

      {/* Auth screens */}
      <Stack.Screen name={ScreenTypes.SIGNIN} component={Signin} />
    </Stack.Navigator>
  );
};
export default StackNavigation;