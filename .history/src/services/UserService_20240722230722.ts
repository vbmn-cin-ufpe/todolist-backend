import { injectable } from 'inversify';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { validateOrReject } from 'class-validator';
import { IUserService } from '../interfaces/IUserService';

@injectable()
export class UserService implements IUserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(userDto: CreateUserDTO): Promise<User | string> {
    await validateOrReject(userDto);
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async getUserById(_id: string): Promise<User | null > {
    return this.userRepository.findOneBy( { id : _id });
  }
}
