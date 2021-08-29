import { Connection, createConnection, getConnectionOptions } from 'typeorm';

const connection = async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  Object.assign(defaultOptions, {
    database:
      process.env.NODE_ENV === 'test' ? 'test' : defaultOptions.database,
  });

  return createConnection(defaultOptions);
};

export { connection };
