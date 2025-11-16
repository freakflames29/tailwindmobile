import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../../lib/twrc";
import PillText from "./PillText";

interface TaskCardProps {
  type: "high" | "low" | "mid";
}

const TaskCard:React.FC<TaskCardProps> = ({type="mid"}) => {
  const backgroundColor = type === "high" ? "bg-red-400" : type === "low" ? "bg-green-400" : "bg-blue-400";
  const borderColor = type === "high" ? "border-red-400" : type === "low" ? "border-green-400" : "border-blue-400";


  return (
    <TouchableOpacity style={[style.card, tw`${backgroundColor}`]} activeOpacity={0.6}>
      <View style={[style.contentCard, tw`${borderColor}`]}>
        <View style={style.row}>
          <View style={style.pillDiv}>
            <PillText text="Important" pillColor="bg-blue-400" />
            <PillText text="Do it First" />
          </View>
          <Text style={style.task} numberOfLines={3} ellipsizeMode="tail">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            maiores laudantium, magnam nemo ab recusandae sed ducimus culpa fuga
            fugit numquam quas voluptas, quam nisi praesentium nihil repellat
            accusamus id?
          </Text>

          <Text style={style.date}>9 PM, 16 Wed 2025</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = {
  card: tw`bg-yellow-400 rounded-6 h-auto`,
  contentCard: tw`bg-white p-4 rounded-6 h-auto mb-2 border-yellow-400 border-2`,
  row: tw`flex justify-between`,
  task: tw`font-brunson text-15 `,
  date: tw`text-lg ml-2 mt-10 font-urb-bold`,
  pillDiv: tw`flex-row gap-1 mb-2`,
};

export default TaskCard;
