import path from 'path';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

const connection = async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  Object.assign(defaultOptions, {
    type: process.env.NODE_ENV === 'test' ? 'sqlite' : defaultOptions.type,
    database:
      process.env.NODE_ENV === 'test'
        ? path.resolve(__dirname, './database.test.sqlite')
        : defaultOptions.database,
  });

  return createConnection(defaultOptions);
};

export { connection };
