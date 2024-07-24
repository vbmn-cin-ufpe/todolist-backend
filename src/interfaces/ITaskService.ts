import { Task } from '../entities/Task';
import { CreateTaskDTO } from '../dtos/CreateTaskDTO';
import { User } from '../entities/User';

export interface ITaskService {
  createTask(taskDto: CreateTaskDTO): Promise<Task>;
  getTasksByUserId(userId: string): Promise<Task[]>;
  completeTask(taskId: string): Promise<Task>;
  getAllTasks(): Promise<Task[]>; 
  completeTask(taskId: string): Promise<Task>;
  editTask(taskId: string, updates: Partial<CreateTaskDTO>): Promise<Task>;
  deleteTask(taskId: string): Promise<void>;
}
