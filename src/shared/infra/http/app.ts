import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import '@shared/container';
import { AppError } from '@shared/errors/AppError';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import { storageConfig } from '@config/storage';
import { MulterError } from 'multer';
import { connection } from '../typeorm/connection';
import { router } from './routes';

connection();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/static', express.static(storageConfig.paths.uploadsFolder));
app.use(router);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    if (error instanceof MulterError) {
      return response.status(403).json({
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
