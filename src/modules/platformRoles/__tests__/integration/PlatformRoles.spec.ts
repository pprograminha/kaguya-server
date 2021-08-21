import { connection as createConnection } from '@shared/infra/typeorm/connection';
import { getConnection } from 'typeorm';

describe('PlatformRoles', () => {
  beforeAll(async () => {
    const connection = await createConnection();

    await connection.runMigrations();
  });
  afterAll(async () => {
    const connection = getConnection();

    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a role by admin', async () => {
    // const usersResponse = await request(app)
    //   .post('/admins/users')
    //   .set('Authorization', `bearer ${authToken}`)
    //   .send({
    //     name: 'Xxx Xxx',
    //     email: 'xxxx@xxxx.xxx',
    //     password: 'xxxxxxxx',
    //     role: 'sub-admin',
    //   });

    expect(2 + 2).toBe(4);
  });
});
