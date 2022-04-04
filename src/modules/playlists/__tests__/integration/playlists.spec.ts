/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { ITrail } from '@modules/trails/domain/entities/itrail';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

let token: string;
let trail: ITrail;

describe('Sessions', () => {
  beforeAll(async () => {
    const sessionsResponse = await request(app)
      .post('/sessions')
      .send({
        email: process.env.ADMIN_ACCESS,
        password: process.env.ADMIN_PASS,
      })
      .expect(200);

    token = sessionsResponse.body.token;

    const { body: requestTrail } = await request(app)
      .post('/sub-admins/trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxxxx',
        description: 'xxxxxxx xxxxxx',
      })
      .expect(201);

    trail = requestTrail;
  });

  it('should be able to create a playlist', async () => {
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

  it('should be able to list playlists from trail', async () => {
    await request(app)
      .post('/sub-admins/playlists')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        trail_id: trail.id,
        name: 'Xxxx Xxxx',
        description: 'xxx xx xxx xxxxx xxxx',
      });

    const response = await request(app)
      .get('/playlists/trail-list-all')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .query({
        trail_id: trail.id,
      });

    expect(response.status).toBe(200);
  });
  it('should be able to delete the playlist', async () => {
    const { body: playlist } = await request(app)
      .post('/sub-admins/playlists')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        trail_id: trail.id,
        name: 'Xxxx Xxxx',
        description: 'xxx xx xxx xxxxx xxxx',
      })
      .expect(201);

    const response = await request(app)
      .delete('/sub-admins/playlists')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .query({
        playlist_id: playlist.id,
      });

    expect(response.status).toBe(200);
  });

  it('should be able to show the playlist', async () => {
    const { body: playlist } = await request(app)
      .post('/sub-admins/playlists')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        trail_id: trail.id,
        name: 'Xxxx Xxxx',
        description: 'xxx xx xxx xxxxx xxxx',
      })
      .expect(201);

    const response = await request(app)
      .get('/playlists/show')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .query({
        playlist_id: playlist.id,
      });

    expect(response.status).toBe(200);
  });
});
