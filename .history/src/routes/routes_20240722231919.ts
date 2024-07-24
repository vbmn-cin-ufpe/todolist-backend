import { Router } from 'express';
import { container } from '../inversify.config';
import { UserController } from '../controllers/UserController';
import { TaskController } from '../controllers/TaskController';
import { AuthController } from '../controllers/AuthController';
import { TYPES } from '../types';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

const userController = container.get<UserController>(TYPES.UserController);
const taskController = container.get<TaskController>(TYPES.TaskController);
const authController = container.get<AuthController>(TYPES.AuthController);

router.post('/users', (req, res) => userController.createUser(req, res));
//router.get('/users/:id', (req, res) => userController.getUserById(req, res));

router.post('/tasks', (req, res) => taskController.createTask(req, res));
router.patch('/tasks/:taskId/complete', (req, res) => taskController.completeTask(req, res));
router.get('/users/:userId/tasks', (req, res) => taskController.getTasksByUserId(req, res));

export { router };
