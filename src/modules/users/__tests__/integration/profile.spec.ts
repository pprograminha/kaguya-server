/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { app } from '@shared/infra/http/app';
import request from 'supertest';

let token: string;

describe('Users', () => {
  beforeAll(async () => {
    const sessionsResponse = await request(app).post('/sessions').send({
      email: process.env.ADMIN_ACCESS,
      password: process.env.ADMIN_PASS,
    });

    token = sessionsResponse.body.token;
  });

  it('show the user profile', async () => {
    const response = await request(app)
      .get('/profile')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .query({
        username: process.env.ADMIN_USERNAME,
      });

    expect(response.status).toBe(200);
  });
});
