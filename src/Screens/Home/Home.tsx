import { View, Text } from "react-native";
import React from "react";
import tw from "../../lib/twrc";
import WorkingView from "../Components/WorkingView";
import TaskCard from "../Components/TaskCard";
import AppButton from "../Components/AppButton";

const Home = () => {
  return (
    <WorkingView>
      <View style={styles.container}>
        <Text style={styles.date}>Wed 16 May, 2025</Text>
        <Text style={styles.hareKrishna}>Hare Krishna 🪷</Text>
        <Text style={styles.greeting}>Good Afternoon</Text>
      </View>

      <AppButton title="Add Task" bgColor="bg-blue-500"/>
      <View style={tw`my-2`}/>
      <TaskCard/>
    </WorkingView>
  );
};

const styles = {
  container: tw`mb-5`,
  hareKrishna: tw`text-blue-500 text-5xl font-brunson`,
  greeting: tw`text-gray-600 text-xl font-urb-reg `,
  date: tw`text-gray-500 text-sm font-urb-reg `,
};

export default Home;
