export interface TodoData {
  id: string;
  text: string;
  done: boolean;
  created_at: Date;
}

export type TodoList = TodoData[];
