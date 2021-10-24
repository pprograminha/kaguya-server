/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { app } from '@shared/infra/http/app';
import { commonsConnection } from '@shared/__tests__/commons';
import request from 'supertest';

let token: string;

describe('Classes', () => {
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

  it('should be able to create a class', async () => {
    const { body: trail } = await request(app)
      .post('/sub-admins/trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxx Xxxxxx',
        description: 'xxxx xxxx xxx',
      });

    const { body: playlist } = await request(app)
      .post('/sub-admins/playlists')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxx Xxxxxx',
        description: 'xxxx xxxx xxx',
        trail_id: trail.id,
      });

    const { body: block } = await request(app)
      .post('/sub-admins/blocks')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxx xxxx',
        playlist_id: playlist.id,
      });

    const response = await request(app)
      .post('/sub-admins/classes')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxx xxxx',
        link: 'https://www.youtube.com',
        description: 'xxxxxx xxx xx x',
        block_id: block.id,
      });

    expect(response.status).toBe(201);
  });
});
