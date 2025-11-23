import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../../lib/twrc";
import PillText from "./PillText";
import { PillType } from "../../Model/TaskData";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Blankspace from "./Blankspace";

interface TaskCardProps {
  type: "high" | "low" | "mid";
  title: string;
  date: string;
  time: string | null;
  pills: PillType[];
  onLongPress?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  type = "mid",
  title = "",
  date = "",
  pills = [],
  onLongPress,
  time = "",
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
      onLongPress={onLongPress}
    >
      <View style={[style.contentCard, tw`${1}`]}>
        <View style={style.row}>
          <View style={style.pillDiv}>
            {pills.map((pill, index) => (
              <PillText key={index} type={pill} />
            ))}
          </View>
          <Text style={style.task} numberOfLines={3} ellipsizeMode="tail">
            {title}
          </Text>
          <Blankspace height={8} />
          <View style={tw`flex-row gap-2`}>
            <View style={style.dateTimeView}>
              <FontAwesome6 name="clock" size={16} color="black" />
              <Text style={style.date}>{time}</Text>
            </View>

            <View style={style.dateTimeView}>
              <FontAwesome6 name="calendar" size={16} color="black" />
              <Text style={style.date}>{date}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = {
  card: tw`bg-yellow-400 rounded-6 h-auto my-2 border-2`,
  contentCard: tw`bg-white p-4 rounded-6 h-auto mb-2`,
  row: tw`flex justify-between`,
  task: tw`font-brunson text-15 `,
  date: tw`text-lg ml-2 font-urb-bold `,
  dateTimeView: tw`px-4 py-1  bg-slate-50 rounded-full flex-row items-center gap-0 border`,
  pillDiv: tw`flex-row gap-2 mb-2 flex-wrap `,
};

export default TaskCard;
