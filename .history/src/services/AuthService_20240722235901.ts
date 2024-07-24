import { inject, injectable } from 'inversify';
import { AppDataSource } from '../data-source';
import { IUserService } from '../interfaces/IUserService';
import { IAuthService } from '../interfaces/IAuthService';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { User } from '../entities/User';
import { validateOrReject } from 'class-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { TYPES } from '../types';

@injectable()
export class AuthService implements IAuthService {
  private userService: IUserService;
  private secret: string;
  private refreshSecret: string;
  private userRepository = AppDataSource.getRepository(User);

  constructor(@inject(TYPES.IUserService) userService: IUserService) {
    this.userService = userService;
    this.secret = process.env.JWT_SECRET || 'secret';
    this.refreshSecret = process.env.JWT_REFRESH_SECRET || 'refreshSecret';
  }

  async login(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.userService.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.generateToken(user, this.secret, '15m');
    const refreshToken = this.generateToken(user, this.refreshSecret, '7d');
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string, refreshToken: string }> {
    const payload = jwt.verify(refreshToken, this.refreshSecret) as { id: string };
    const user = await this.userService.getUserById(payload.id);
    if (!user) {
      throw new Error('Invalid refresh token');
    }

    const newAccessToken = this.generateToken(user, this.secret, '15m');
    const newRefreshToken = this.generateToken(user, this.refreshSecret, '7d');
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async register(userDto: CreateUserDTO): Promise<User> {
    await validateOrReject(userDto);
    userDto.password = await bcrypt.hash(userDto.password, 10);
    const newUser = this.userRepository.create(userDto);
    //return 'User registered successfully';
    return this.userRepository.save(newUser);
  }

  private generateToken(user: User, secret: string, expiresIn: string): string {
    return jwt.sign({ id: user.id }, secret, { expiresIn });
  }
}
