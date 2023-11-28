export interface TodoData {
  id: string;
  text: string;
  done: boolean;
  created_at?: any;
}

export type TodoList = TodoData[];
