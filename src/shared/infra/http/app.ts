import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import '@shared/container';
import { storageConfig } from '@config/storage';
import { AppError } from '@shared/errors/app-error';
import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';
import { router } from './routes';

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
        generic_code: error.genericCode,
        status_code: error.statusCode,
      });
    }

    if (error instanceof MulterError) {
      return response.status(403).json({
        status: 'error',
        message: error.message,
        generic_code: error.code.length,
        status_code: 403,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      generic_code: 50,
      status_code: 500,
    });
  },
);

export { app };
