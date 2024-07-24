import { injectable } from 'inversify';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { validateOrReject } from 'class-validator';
import { IUserService } from '../interfaces/IUserService';
import { QueryFailedError } from 'typeorm';
import { NotFoundError } from '../utils/errors/NotFoundError';
import { ValidationError } from '../utils/errors/ValidationError';
import bcrypt from 'bcryptjs';


@injectable()
export class UserService implements IUserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(userDto: CreateUserDTO): Promise<User | string> {
    try {
      await validateOrReject(userDto);
      userDto.password = await bcrypt.hash(userDto.password, 10);
      const user = this.userRepository.create(userDto);
      const userInfo =  await this.userRepository.save(user);
      
      return userInfo.id

    } catch (errors) {
      if (errors instanceof Array && errors[0] instanceof ValidationError) {
        throw new ValidationError('Validation failed', errors);
      }
      throw new Error('An unexpected error occurred while creating the user.');
    }
  }  

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new Error('An unexpected error occurred while retrieving the user by email.');
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundError('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error('An unexpected error occurred while retrieving the user by ID.');
    }
  }

  async updateUser(userId: string, updates: Partial<CreateUserDTO>): Promise<User | string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updates);
    return this.userRepository.save(user);
  }

  async deleteUser(userId: string): Promise<void | string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.remove(user);
    return `User ${userId} removed with success !`
  }
}
