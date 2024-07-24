import 'reflect-metadata';
import express from 'express';
import cors from 'cors'
import { json } from 'body-parser';
import { router } from './routes/routes';

const app = express();
app.use(cors())
app.use(json());
app.use('/api', router);

export { app };
