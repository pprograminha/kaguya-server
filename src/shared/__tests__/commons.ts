import { createConnection, getConnection } from 'typeorm';

const commonsConnection = {
  beforeAll: async (): Promise<void> => {
    const connection = await createConnection();

    await connection.runMigrations();
  },
  afterAll: async (): Promise<void> => {
    const connection = getConnection();

    await connection.dropDatabase();
    await connection.close();
  },
};
export { commonsConnection };
