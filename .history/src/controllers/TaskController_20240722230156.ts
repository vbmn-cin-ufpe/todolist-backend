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
      res.status(201).json(task);
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
      res.json(task);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  async getTasksByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    const tasks = await this.taskService.getTasksByUserId(userId);
    res.json(tasks);
  }
}
