import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ITaskService } from '../interfaces/ITaskService';
import { CreateTaskDTO } from '../dtos/CreateTaskDTO';
import { plainToInstance } from 'class-transformer'; 
import { validateOrReject, ValidationError } from 'class-validator';
import { TYPES } from '../types';

@injectable()
export class TaskController {
  constructor(@inject(TYPES.ITaskService) private taskService: ITaskService) {}

  async createTask(req: Request, res: Response) {
    try {
      
      const taskDto = plainToInstance(CreateTaskDTO, req.body);
      await validateOrReject(taskDto);
      const task = await this.taskService.createTask(taskDto);
      res.status(201).json({ message: 'Task created successfully', task });
    } catch (errors) {
      if (errors instanceof Array && errors[0] instanceof ValidationError) {
        const validationErrors = errors.map(error => Object.values(error.constraints || {})).flat();
        res.status(400).json({ errors: validationErrors });
      } else {
        res.status(500).send('Internal server error');
      }
    }
  }

  async completeTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const task = await this.taskService.completeTask(taskId);
      res.json({ message: 'Task completed successfully', task });
    } catch (err) {
      res.status(400).json({ error: `Error to complete task` });
    }
  }

  async getTasksByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params; // Ensure 'userId' matches the route parameter name
      const tasks = await this.taskService.getTasksByUserId(userId); // Pass userId to the service
      res.json(tasks);
    } catch (error) {
      res.status(400).json({ error: 'Unable to retrieve tasks' });
    }
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(400).json({ error: 'Unable to retrieve all tasks' });
    }
  }
}
