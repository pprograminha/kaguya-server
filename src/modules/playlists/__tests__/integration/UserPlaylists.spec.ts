import { app } from '@shared/infra/http/app';
import { commonsConnection } from '@shared/__tests__/commons';
import request from 'supertest';

let token: string;

describe('Sessions', () => {
  beforeAll(commonsConnection.createConnection);
  afterAll(commonsConnection.dropConnection);

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

  it('should be able to list all user playlists from trail', async () => {
    const { body: trail } = await request(app)
      .post('/sub-admins/trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxxxx',
        description: 'xxxxxxx xxxxxx',
      })
      .expect(201);

    const response = await request(app)
      .get('/user-playlists/trail-list-all')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .query({
        trail_id: trail.id,
      });

    expect(response.status).toBe(200);
  });
});