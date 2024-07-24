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
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
