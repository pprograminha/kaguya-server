import { createConnection, getConnection } from 'typeorm';

const commonsConnection = {
  createConnection: async (): Promise<void> => {
    const connection = await createConnection();

    await connection.runMigrations();
  },
  dropConnection: async (): Promise<void> => {
    const connection = getConnection();

    await connection.dropDatabase();
    await connection.close();
  },
};
export { commonsConnection };
