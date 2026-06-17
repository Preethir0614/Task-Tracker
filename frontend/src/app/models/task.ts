export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatusFilter = 'All' | 'Pending' | 'Done';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  due_date?: string;
  priority: TaskPriority;
  is_done?: boolean;
  created_at?: string;
}

export type CreateTask = Omit<Task, 'id' | 'created_at' | 'is_done'>;
