export type PillType = "DO_IT_FIRST" | "IMPORTANT" | "NEED_TO_DO_TODAY";

export interface TaskData {
  id: string;
  title: string;
  description: string;
  type: "high" | "low" | "mid";
  date: string;
  pills: PillType[];
}
