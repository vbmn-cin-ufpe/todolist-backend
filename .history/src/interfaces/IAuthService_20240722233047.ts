import { User } from '../entities/User';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

export interface IAuthService {
  login(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }>;
  refresh(refreshToken: string): Promise<{ accessToken: string, refreshToken: string }>;
  register(userDto: CreateUserDTO): Promise<User | string>;
}
