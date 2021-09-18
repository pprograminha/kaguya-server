import { app } from '@shared/infra/http/app';
import { commonsConnection } from '@shared/__tests__/commons';
import request from 'supertest';

let token: string;

describe('PlatformRoles', () => {
  beforeAll(commonsConnection.createConnection);
  afterAll(commonsConnection.dropConnection);

  beforeAll(async () => {
    const sessionsResponse = await request(app).post('/sessions').send({
      email: process.env.ADMIN_ACCESS,
      password: process.env.ADMIN_PASS,
    });

    token = sessionsResponse.body.token;
  });

  it('should be able to create a platform role', async () => {
    const response = await request(app)
      .post('/sub-admins/platform-roles')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        permission: 3,
        role: 'custom-role',
      });

    expect(response.status).toBe(201);
  });

  it('should be able to list all platform roles', async () => {
    const response = await request(app)
      .get('/platform-roles/list-all')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
  });
});
