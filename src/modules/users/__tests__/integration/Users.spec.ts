/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { app } from '@shared/infra/http/app';
import { commonsConnection } from '@shared/__tests__/commons';
import request from 'supertest';

let token: string;

describe('Users', () => {
  beforeAll(commonsConnection.createConnection);
  afterAll(commonsConnection.dropConnection);

  beforeAll(async () => {
    const sessionsResponse = await request(app).post('/sessions').send({
      email: process.env.ADMIN_ACCESS,
      password: process.env.ADMIN_PASS,
    });

    token = sessionsResponse.body.token;
  });

  it('should be able to create an user', async () => {
    const response = await request(app).post('/users').send({
      username: 'xxxxxxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxxxxxx',
    });

    expect(response.status).toBe(201);
  });

  it('should be able to create an user by creator', async () => {
    await request(app)
      .post('/sub-admins/roles')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        permission: 1,
        role: 'sub-admin',
      });

    const response = await request(app)
      .post('/sub-admins/users')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxx Xxx',
        username: 'xxxxx',
        email: 'xxxxxx@xxxx.xxx',
        password: 'xxxxxxxx',
        role: 'sub-admin',
      });

    expect(response.status).toBe(201);
  });
  it('should be able to list all users', async () => {
    const response = await request(app)
      .get('/sub-admins/users/list-all')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
  });

  it('should be able to validate the token', async () => {
    const response = await request(app)
      .post('/users/tokens/validate-token')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
  });
});
