export type PillType = "DO_IT_FIRST" | "IMPORTANT" | "NEED_TO_DO_TODAY";

export interface TaskData {
  id: string;
  title: string;
  description: string;
  type: "high" | "low" | "mid";
  date: string;
  pills: PillType[];
}

export interface TaskDBType {
  id?: string;
  user_id: string;
  title: string;
  priority: "high" | "mid" | "low";
  due_date: string;
  due_time: string | null;
  tags: PillType[];
  is_completed: boolean;
  created_at?: string;
}
