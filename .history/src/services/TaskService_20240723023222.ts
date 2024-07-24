import { injectable } from 'inversify';
import { AppDataSource } from '../data-source';
import { Task } from '../entities/Task';
import { CreateTaskDTO } from '../dtos/CreateTaskDTO';
import { validateOrReject } from 'class-validator';
import { ITaskService } from '../interfaces/ITaskService';
import { User } from '../entities/User';

@injectable()
export class TaskService implements ITaskService {
  private taskRepository = AppDataSource.getRepository(Task);
  private userRepository = AppDataSource.getRepository(User);

  async createTask(taskDto: CreateTaskDTO): Promise<Task> {
    await validateOrReject(taskDto);

    const user = await this.userRepository.findOne({ where: { id: taskDto.user } });

    if (!user) {
      throw new Error('User not found');
    }

    const task = this.taskRepository.create({ ...taskDto, user });
    return this.taskRepository.save(task);
  }

  async getTasksByUserId(userToFind: User): Promise<Task[]> {
    const userId = userToFind.id;
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    return this.taskRepository.find({ where: { user: user } });
  }

  async completeTask(taskId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new Error('Task not found');
    }

    if (task.completed) {
      throw new Error('Completed tasks cannot be edited');
    }

    task.completed = true;
    task.completionDate = new Date();
    return this.taskRepository.save(task);
  }
}
