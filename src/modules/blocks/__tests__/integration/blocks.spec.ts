/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { app } from '@shared/infra/http/app';
import request from 'supertest';

let token: string;

describe('Blocks', () => {
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
        name: 'Xxxxxx Xxxx Xxxx Xxxx Xxxxx',
        slug: 'xxxxxx-xxxx-xxxx-xxxx-xxxxx',
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
        name: 'Xxxxxx Xxxx Xxxx Xxxx Xxxx',
        slug: 'xxxxxx-xxxx-xxxx-xxxx-xxxx',
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
        name: 'Xxxxxxx Xxx X',
        slug: 'xxxxxxx-xxx-x',
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Xxxxxxx Xxx X');
  });

  it('should be able to list blocks', async () => {
    const { body: trail } = await request(app)
      .post('/sub-admins/trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxxx X',
        slug: 'xxxxxx-x',
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
        name: 'Xxxxxx Xxxx Xx Xx',
        slug: 'xxxxxx-xxxx-xx-xx',
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
        name: 'Xxx Xxxx Xxxxx Xxxxx',
        slug: 'xxx-xxxx-xxxxx-xxxxx',
      })
      .expect(201);

    await request(app)
      .post('/sub-admins/blocks')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        playlist_id: playlist.id,
        name: 'Xx Xx Xxx',
        slug: 'xx-xx-xxx',
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

  it('should be able to show the block', async () => {
    const { body: trail } = await request(app)
      .post('/sub-admins/trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxx Xxxxx Xxxxx',
        slug: 'xxxx-xxxxx-xxxxx',
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
        name: 'Xxxxxxxxxxxxxxxxxxxxxx',
        slug: 'xxxxxxxxxxxxxxxxxxxxxx',
        description: 'xxxxx xxxxx xxx xx xxxxx xxxxx xxxxx xxx xx xxxxx',
      })
      .expect(201);

    const { body: block } = await request(app)
      .post('/sub-admins/blocks')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        playlist_id: playlist.id,
        slug: 'xxx-xxxxxxx',
        name: 'Xxx Xxxxxxx',
      })
      .expect(201);

    const response = await request(app)
      .get('/blocks/show')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .query({
        block_id: block.id,
      });

    expect(response.status).toBe(200);
  });

  it('should be able to delete the block', async () => {
    const { body: trail } = await request(app)
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

    const { body: playlist } = await request(app)
      .post('/sub-admins/playlists')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        trail_id: trail.id,
        name: 'Xxxxxxxxx',
        slug: 'xxxxxxxxx',
        description: 'xxxxx xxxxx xxx xx xxxxx xxxxx xxxxx xxx xx xxxxx',
      })
      .expect(201);

    const { body: block } = await request(app)
      .post('/sub-admins/blocks')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        playlist_id: playlist.id,
        slug: 'xxx-xxxx',
        name: 'Xxx Xxxx',
      })
      .expect(201);

    const response = await request(app)
      .delete('/sub-admins/blocks')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .query({
        block_id: block.id,
      });

    expect(response.status).toBe(200);
  });
});
