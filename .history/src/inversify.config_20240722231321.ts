import 'reflect-metadata';
import { Container } from 'inversify';
import { TaskService } from './services/TaskService';
import { UserService } from './services/UserService';
import { TaskController } from './controllers/TaskController';
import { UserController } from './controllers/UserController';
import { AuthController } from './controllers/AuthController'; // new
import { ITaskService } from './interfaces/ITaskService';
import { IUserService } from './interfaces/IUserService';
import { IAuthService } from './interfaces/IAuthService'; // new
import { TYPES } from './types';

const container = new Container();
container.bind<ITaskService>(TYPES.ITaskService).to(TaskService);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<TaskController>(TYPES.TaskController).to(TaskController);
container.bind<UserController>(TYPES.UserController).to(UserController);

export { container };
