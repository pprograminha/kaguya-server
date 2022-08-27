import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import '@shared/container';
import { storageConfig } from '@config/storage';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { AppError } from '@shared/errors/app-error';
import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLError } from 'graphql';
import { MulterError } from 'multer';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/type-defs';
import { router } from './routes';

const app = express();

app.use(
  cors({
    origin: [
      ...(process.env.NODE_ENV === 'production'
        ? ['https://kaguya.com.br']
        : []),
    ],
  }),
);
app.use(express.json());
app.use('/static', express.static(storageConfig.paths.uploadsFolder));
app.use(router);

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: (error: GraphQLError) => {
      if (!error.originalError) return error;

      const stringToStringify = error.originalError.message
        .replace('Unexpected error value: ', '')
        .replace(/(\w+:)|(\w+ :)/g, matchedStr => {
          return `"${matchedStr.substring(0, matchedStr.length - 1)}":`;
        });

      return {
        status: 'error',
        ...JSON.parse(stringToStringify),
      };
    },
  }),
);

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
