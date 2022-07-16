/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { app } from '@shared/infra/http/app';
import request from 'supertest';

let token: string;

describe('UserTrails', () => {
  beforeAll(async () => {
    const sessionsResponse = await request(app)
      .post('/sessions')
      .send({
        email: process.env.ADMIN_ACCESS,
        password: process.env.ADMIN_PASS,
      })
      .expect(200);

    token = sessionsResponse.body.token;
  });

  it('should be able to create user trail', async () => {
    const { body: trail } = await request(app)
      .post('/sub-admins/trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxx Xxxx Xxxxxxxxxx Xxxxxx Xxxx',
        slug: 'xxx-xxxx-xxxxxxxxxx-xxxxxx-xxxx',
        description: 'xxxxx xxxxx xxx xx xxxxx xxxxx xxxxx xxx xx xxxxx',
      });

    const response = await request(app)
      .post('/user-trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        trail_id: trail.id,
      });

    expect(response.status).toBe(201);
  });

  it('should be able to list all user trails from user', async () => {
    const response = await request(app)
      .get('/user-trails/list-all')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
  });

  it('should be able to delete user trail', async () => {
    const { body: trail } = await request(app)
      .post('/sub-admins/trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxx Xxxx Xxxxxxxxxx Xxxxxx Xxxxx',
        slug: 'xxx-xxxx-xxxxxxxxxx-xxxxxx-xxxxx',
        description: 'xxxxx xxxxx xxx xx xxxxx xxxxx xxxxx xxx xx xxxxx',
      })
      .expect(201);

    const { body: userTrail } = await request(app)
      .post('/user-trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        trail_id: trail.id,
      })
      .expect(201);

    const response = await request(app)
      .delete('/user-trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .query({
        trail_id: userTrail.id,
      });

    expect(response.status).toBe(200);
  });
});
