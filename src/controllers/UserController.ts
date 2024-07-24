import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IUserService } from '../interfaces/IUserService';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { plainToInstance, plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { TYPES } from '../types';
import { NotFoundError } from '../utils/errors/NotFoundError';

@injectable()
export class UserController {
  constructor(@inject(TYPES.IUserService) private userService: IUserService) {}

  async createUser(req: Request, res: Response) {
    try {
      const userDto = plainToInstance(CreateUserDTO, req.body);
      await validateOrReject(userDto);
      const user = await this.userService.createUser(userDto);
      res.status(201).json(user);
    } catch (errors) {
      if (errors instanceof Array && errors[0] instanceof ValidationError) {
        const validationErrors = errors.map(error => Object.values(error.constraints || {})).flat();
        res.status(400).json({ errors: validationErrors });
      } else {
        res.status(500).send('Internal server error');
      }
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      res.json(user);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const updates = req.body;
      const updatedUser = await this.userService.updateUser(userId, updates);
      res.json(updatedUser);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      await this.userService.deleteUser(userId);
      res.status(204).send(); // No content to return after successful deletion
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

}
