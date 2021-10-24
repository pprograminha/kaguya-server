/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { app } from '@shared/infra/http/app';
import { commonsConnection } from '@shared/__tests__/commons';
import request from 'supertest';

let token: string;

describe('Blocks', () => {
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

  it('should be able to create a block', async () => {
    const { body: trail } = await request(app)
      .post('/sub-admins/trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxxx',
        description: 'xxxxx xxxxx xxx xx xxxxx xxxxx xxxxx xxx xx xxxxx',
      })
      .expect(201);

    const { body: playlist } = await request(app)
      .post('/sub-admins/playlists')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        trail_id: trail.id,
        name: 'Xxxxxx',
        description: 'xxxxx xxxxx xxx xx xxxxx xxxxx xxxxx xxx xx xxxxx',
      })
      .expect(201);

    const response = await request(app)
      .post('/sub-admins/blocks')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        playlist_id: playlist.id,
        name: 'Xxxxxxx',
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Xxxxxxx');
  });

  it('should be able to list blocks', async () => {
    const { body: trail } = await request(app)
      .post('/sub-admins/trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxxx',
        description: 'xxxxx xxxxx xxx xx xxxxx xxxxx xxxxx xxx xx xxxxx',
      })
      .expect(201);

    const { body: playlist } = await request(app)
      .post('/sub-admins/playlists')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        trail_id: trail.id,
        name: 'Xxxxxx',
        description: 'xxxxx xxxxx xxx xx xxxxx xxxxx xxxxx xxx xx xxxxx',
      })
      .expect(201);

    await request(app)
      .post('/sub-admins/blocks')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        playlist_id: playlist.id,
        name: 'Xxx Xxxx',
      })
      .expect(201);

    await request(app)
      .post('/sub-admins/blocks')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        playlist_id: playlist.id,
        name: 'Xxxxxxx',
      })
      .expect(201);

    const response = await request(app)
      .get('/blocks/playlist-list-all')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .query({
        playlist_id: playlist.id,
      });

    expect(response.status).toBe(200);
  });
});
