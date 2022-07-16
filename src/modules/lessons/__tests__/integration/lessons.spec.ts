/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

let token: string;
let block: IBlock;

describe('lessons', () => {
  beforeAll(async () => {
    const sessionsResponse = await request(app)
      .post('/sessions')
      .send({
        email: process.env.ADMIN_ACCESS,
        password: process.env.ADMIN_PASS,
      })
      .expect(200);

    token = sessionsResponse.body.token;

    const { body: trail } = await request(app)
      .post('/sub-admins/trails')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxx Xxxxxx',
        slug: 'xxxxx-xxxxxx',
        description: 'xxxx xxxx xxx',
      })
      .expect(201);

    const { body: playlist } = await request(app)
      .post('/sub-admins/playlists')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxx Xxxxxx',
        slug: 'xxxxx-xxxxxx',
        description: 'xxxx xxxx xxx',
        trail_id: trail.id,
      })
      .expect(201);

    const { body: rqBlock } = await request(app)
      .post('/sub-admins/blocks')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxx xxxx',
        slug: 'xxxxx-xxxx',
        playlist_id: playlist.id,
      })
      .expect(201);

    block = rqBlock;
  });

  it('should be able to create a lesson', async () => {
    const response = await request(app)
      .post('/sub-admins/lessons')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxx xxxx',
        slug: 'xxxxx-xxxx',
        link: 'https://www.youtube.com',
        description: 'xxxxxx xxx xx x',
        block_id: block.id,
      });

    expect(response.status).toBe(201);
  });

  it('should be able to delete the lesson', async () => {
    const { body: _lesson } = await request(app)
      .post('/sub-admins/lessons')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Xxxxx xxxxx',
        slug: 'xxxxx-xxxxx',
        link: 'https://www.youtube.com',
        description: 'xxxxxx xxx xx x',
        block_id: block.id,
      })
      .expect(201);

    const response = await request(app)
      .delete('/sub-admins/lessons')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .query({
        lesson_id: _lesson.id,
      });

    expect(response.status).toBe(200);
  });
});
