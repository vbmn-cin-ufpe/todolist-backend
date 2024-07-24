import { injectable } from 'inversify';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { validateOrReject } from 'class-validator';
import { IUserService } from '../interfaces/IUserService';
import { QueryFailedError } from 'typeorm';
import { NotFoundError } from '../utils/errors/NotFoundError';
import { ValidationError as CustomValidationError } from '../utils/errors/ValidationError';


@injectable()
export class UserService implements IUserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(userDto: CreateUserDTO): Promise<User | string> {
    await validateOrReject(userDto);
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }  

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
}
