import { User } from '../entities/User';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

export interface IUserService {
  createUser(userDto: CreateUserDTO): Promise<User | string>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(id: string): Promise<User | null>;
}
