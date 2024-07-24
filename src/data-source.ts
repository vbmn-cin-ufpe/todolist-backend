import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { User }  from '../src/entities/User';
import { Task }  from '../src/entities/Task';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'db',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'todolist',
    synchronize: true,
    logging: false,
    entities: [User, Task],
    subscribers: []
})