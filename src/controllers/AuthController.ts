import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IAuthService } from '../interfaces/IAuthService';
import { TYPES } from '../types';

@injectable()
export class AuthController {
  constructor(@inject(TYPES.IAuthService) private authService: IAuthService) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const tokens = await this.authService.login(email, password);
      res.json(tokens);
    } catch (error) {
        res.status(401).json({ error: 'Invalid email or password' });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const tokens = await this.authService.refresh(refreshToken);
      res.json(tokens);
    } catch (error) {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const message = await this.authService.register(req.body);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
  }
}
