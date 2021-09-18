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

  it('should be able to create a playlist', async () => {
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
      .post('/sub-admins/playlists')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        trail_id: trail.id,
        name: 'Xxxxxxx',
        description: 'xxxxxxx xxxxxx',
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Xxxxxxx');
  });
});