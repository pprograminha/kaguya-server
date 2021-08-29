import { app } from '@shared/infra/http/app';
import { commonsConnection } from '@shared/__tests__/commons';
import request from 'supertest';

describe('Users', () => {
  beforeAll(commonsConnection.beforeAll);
  afterAll(commonsConnection.afterAll);

  it('should be able to create an user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Xxx Xxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxxxxxx',
    });

    expect(response.status).toBe(201);
  });

  it('should be able to create an user by creator', async () => {
    const sessionsResponse = await request(app).post('/sessions').send({
      email: process.env.ADMIN_ACCESS,
      password: process.env.ADMIN_PASS,
    });

    const { token } = sessionsResponse.body;

    await request(app)
      .post('/sub-admins/platform-roles')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        permission: 1,
        role: 'sub-admin',
      });

    const usersResponse = await request(app)
      .post('/sub-admins/users')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxx Xxx',
        email: 'xxxxxx@xxxx.xxx',
        password: 'xxxxxxxx',
        role: 'sub-admin',
      });

    expect(usersResponse.status).toBe(201);
  });
});
