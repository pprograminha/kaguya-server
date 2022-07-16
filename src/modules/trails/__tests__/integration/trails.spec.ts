/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { ITrail } from '@modules/trails/domain/entities/itrail';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

let token: string;
let trail: ITrail;

describe('Trails', () => {
  beforeAll(async () => {
    const sessionsResponse = await request(app)
      .post('/sessions')
      .send({
        email: process.env.ADMIN_ACCESS,
        password: process.env.ADMIN_PASS,
      })
      .expect(200);

    token = sessionsResponse.body.token;

    const response = await request(app)
      .post('/sub-admins/trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxxx',
        slug: 'xxxxxx',
        description: 'xxxxx xxxxx xxx xx xxxxx xxxxx xxxxx xxx xx xxxxx',
      })
      .expect(201);

    trail = response.body;
  });

  it('should be able to list all trails', async () => {
    const response = await request(app)
      .get('/trails/list-all')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
  });

  it('should be able to create a trail', async () => {
    const response = await request(app)
      .post('/sub-admins/trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxxxx',
        slug: 'xxxxxxx',
        description: 'xxxxx xxxxx xxx xx xxxxx xxxxx xxxxx xxx xx xxxxx',
      });

    expect(response.status).toBe(201);
  });

  it('should be able to update the trail', async () => {
    const response = await request(app)
      .put('/sub-admins/trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        trail_id: trail.id,
        name: 'Xxxxxxxxxxx',
        slug: 'xxxxxxxxxxx',
        description: 'xxxxxxx xxxxxx',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Xxxxxxxxxxx');
  });

  it('should be able to show the trail', async () => {
    const response = await request(app)
      .get('/trails/show')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .query({
        trail_id: trail.id,
      });

    expect(response.status).toBe(200);
  });
});
