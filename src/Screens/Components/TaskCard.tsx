import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../../lib/twrc";
import PillText from "./PillText";
import { PillType } from "../../Model/TaskData";

interface TaskCardProps {
  type: "high" | "low" | "mid";
  title: string;
  date: string;
  pills: PillType[];
}

const TaskCard: React.FC<TaskCardProps> = ({
  type = "mid",
  title = "",
  date = "",
  pills = [],
}) => {
  const backgroundColor =
    type === "high"
      ? "bg-red-400"
      : type === "low"
      ? "bg-green-400"
      : "bg-yellow-400";
  const borderColor =
    type === "high"
      ? "border-red-400"
      : type === "low"
      ? "border-green-400"
      : "border-yellow-400";

  return (
    <TouchableOpacity
      style={[style.card, tw`${backgroundColor}`]}
      activeOpacity={0.6}
    >
      <View style={[style.contentCard, tw`${borderColor}`]}>
        <View style={style.row}>
          <View style={style.pillDiv}>
            {pills.map((pill, index) => (
              <PillText key={index} type={pill} />
            ))}
          </View>
          <Text style={style.task} numberOfLines={3} ellipsizeMode="tail">
            {title}
          </Text>

          <Text style={style.date}>{date}</Text>
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
  pillDiv: tw`flex-row gap-2 mb-2 flex-wrap `,
};

export default TaskCard;
