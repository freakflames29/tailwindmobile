import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./StackNavigation";

const NavigationWrapper = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default NavigationWrapper;
