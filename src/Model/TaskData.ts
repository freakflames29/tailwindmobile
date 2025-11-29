export type PillType = "DO_IT_FIRST" | "IMPORTANT" | "NEED_TO_DO_TODAY";
export type PriorityType = "high" | "low" | "mid";
export interface TaskData {
  id: string;
  title: string;
  description: string;
  type: PriorityType;
  date: string;
  pills: PillType[];
}

export interface TaskDBType {
  id?: string;
  user_id: string;
  title: string;
  priority: PriorityType;
  due_date: string;
  due_time: string | null;
  tags: PillType[];
  is_completed: boolean;
  created_at?: string;
  failed: boolean;
}
