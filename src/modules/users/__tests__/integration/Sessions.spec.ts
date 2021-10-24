/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { app } from '@shared/infra/http/app';
import { commonsConnection } from '@shared/__tests__/commons';
import request from 'supertest';

describe('Sessions', () => {
  beforeAll(commonsConnection.createConnection);
  afterAll(commonsConnection.dropConnection);

  it('should be able to authenticate the user', async () => {
    await request(app).post('/users').send({
      name: 'Xxx Xxx',
      email: 'xxxxx@xxxx.xxx',
      password: 'xxxxxxxx',
    });

    const response = await request(app).post('/sessions').send({
      email: 'xxxxx@xxxx.xxx',
      password: 'xxxxxxxx',
    });

    expect(response.status).toBe(200);
  });
});
