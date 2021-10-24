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
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLError } from 'graphql';
import { IUser } from '@modules/users/domain/entities/IUser';
import { ICreateUserRequestDTO } from '@modules/users/dtos/ICreateUserRequestDTO';
import { ListAllUsersService } from '@modules/users/services/ListAllUsersService';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';
import { connection } from '../typeorm/connection';
import { router } from './routes';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

connection();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/static', express.static(storageConfig.paths.uploadsFolder));
app.use(router);

type GraphQLCreateUser = {
  input: ICreateUserRequestDTO;
};

const schema = makeExecutableSchema({
  resolvers: {
    Query: {
      listAllUsers: async (): Promise<IUser[]> => {
        const listAllUsers = container.resolve(ListAllUsersService);
        const users = listAllUsers.execute();

        return users;
      },
    },
    Mutation: {
      createUser: async (
        _: any,
        { input }: GraphQLCreateUser,
      ): Promise<IUser> => {
        const createUser = container.resolve(CreateUserService);

        console.log('called before');
        const user = await createUser.execute(input);
        console.log('user: ', user);

        console.log('called after');

        return user;
      },
    },
  },
  typeDefs: `
    scalar Date

    type User {
      id: String!,
      name: String!,
      email: String!,
      username: String!,
      avatar: String,
      enabled: Boolean!,
      avatar_url: String,
      created_at: Date!,
      updated_at: Date!,
    }

    type Query {
      listAllUsers: [User]
    }

    input UserInput {
      name: String!,
      email: String!,
      password: String!,
      creator_id: String,
      role: String,
    }

    type Mutation {
      createUser(input: UserInput): User
    }
  `,
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
        statusCode: error.statusCode,
      });
    }

    if (error instanceof MulterError) {
      return response.status(403).json({
        status: 'error',
        message: error.message,
        statusCode: 403,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      statusCode: 500,
    });
  },
);

export { app };
