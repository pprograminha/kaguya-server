/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { createConnection, getConnection } from 'typeorm';
import '../infra/prisma/seeders';

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
