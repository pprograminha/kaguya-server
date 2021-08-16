import { app } from '@shared/infra/http/app';
import { connection as createConnection } from '@shared/infra/typeorm/connection';
import request from 'supertest';
import { getConnection } from 'typeorm';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();

    await connection.runMigrations();
  });
  afterAll(async () => {
    const connection = getConnection();

    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create an user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Xxx Xxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxxxxxx',
    });

    expect(response.status).toBe(201);
  });
});
