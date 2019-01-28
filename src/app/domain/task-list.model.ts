import { Task } from './task.model';

export interface TaskList {
    id?: string;
    name: string;
    projectId: string;
    order: number;
    taskIds?: string[];
    tasks?: Task[];
  }
