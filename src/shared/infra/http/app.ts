import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import { AppError } from '@shared/errors/AppError';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { connection } from '../typeorm/connection';
import { router } from './routes';

connection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

export { app };
