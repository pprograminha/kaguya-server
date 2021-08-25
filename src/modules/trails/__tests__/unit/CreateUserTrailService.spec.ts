import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { CreateUserTrailService } from '@modules/trails/services/CreateUserTrailService';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeUserTrailsRepository } from '../fakes/FakeUserTrailsRepository';

let fakeTrailsRepository: FakeTrailsRepository;
let fakeUserTrailsRepository: FakeUserTrailsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createUserTrail: CreateUserTrailService;

describe('CreateUserTrail', () => {
  beforeEach(() => {
    fakeTrailsRepository = new FakeTrailsRepository();
    fakeUserTrailsRepository = new FakeUserTrailsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createUserTrail = new CreateUserTrailService(
      fakeUserTrailsRepository,
      fakeTrailsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a user trail', async () => {
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxx xxxx x',
      name: 'Xxxx',
    });

    const user = await fakeUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    const userTrail = await createUserTrail.execute({
      trail_id: trail.id,
      user_id: user.id,
    });

    expect(userTrail.trail_id).toBe(trail.id);
    expect(userTrail).toHaveProperty('user_id');
  });

  it('should not be able to create a user trail if the trail does not exist', async () => {
    const user = await fakeUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    await expect(
      createUserTrail.execute({
        trail_id: 'non-existing-trail',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user trail with non-existing user', async () => {
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxx xxxx x',
      name: 'Xxxx',
    });

    await expect(
      createUserTrail.execute({
        trail_id: trail.id,
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user trail with an existing one', async () => {
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxx xxxx x',
      name: 'Xxxx',
    });

    const user = await fakeUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    await createUserTrail.execute({
      trail_id: trail.id,
      user_id: user.id,
    });

    await expect(
      createUserTrail.execute({
        trail_id: trail.id,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user trail with an existing one', async () => {
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxx xxxx x',
      name: 'Xxxx',
    });

    const user = await fakeUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    await createUserTrail.execute({
      trail_id: trail.id,
      user_id: user.id,
    });

    await expect(
      createUserTrail.execute({
        trail_id: trail.id,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user trail with an existing one', async () => {
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxx xxxx x',
      name: 'Xxxx',
    });

    const user = await fakeUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    jest
      .spyOn(fakeUserTrailsRepository, 'findById')
      .mockImplementationOnce(async () => undefined);

    await expect(
      createUserTrail.execute({
        trail_id: trail.id,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
