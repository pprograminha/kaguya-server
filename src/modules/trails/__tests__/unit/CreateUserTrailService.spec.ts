import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { CreateUserTrailService } from '@modules/trails/services/CreateUserTrailService';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateUserPlaylistsService } from '@modules/playlists/services/CreateUserPlaylistsService';
import { FakeUserPlaylistsRepository } from '@modules/playlists/__tests__/fakes/FakeUserPlaylistsRepository';
import { FakePlaylistsRepository } from '@modules/playlists/__tests__/fakes/FakePlaylistsRepository';
import { FakeBlocksRepository } from '@modules/blocks/__tests__/fakes/FakeBlocksRepository';
import { FakeUserBlocksRepository } from '@modules/blocks/__tests__/fakes/FakeUserBlocksRepository';
import { FakeClassesRepository } from '@modules/classes/__tests__/fakes/FakeClassesRepository';
import { FakeUserClassesRepository } from '@modules/classes/__tests__/fakes/FakeUserClassesRepository';
import { FakeUserTrailsRepository } from '../fakes/FakeUserTrailsRepository';

let fakeTrailsRepository: FakeTrailsRepository;
let fakeUserTrailsRepository: FakeUserTrailsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserPlaylistsRepository: FakeUserPlaylistsRepository;
let fakePlaylistsRepository: FakePlaylistsRepository;
let fakeBlocksRepository: FakeBlocksRepository;
let fakeUserBlocksRepository: FakeUserBlocksRepository;
let fakeClassesRepository: FakeClassesRepository;
let fakeUserClassesRepository: FakeUserClassesRepository;

let createUserTrail: CreateUserTrailService;
let createUserPlaylistsService: CreateUserPlaylistsService;

describe('CreateUserTrail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTrailsRepository = new FakeUserTrailsRepository();
    fakeUserPlaylistsRepository = new FakeUserPlaylistsRepository();
    fakePlaylistsRepository = new FakePlaylistsRepository();
    fakeTrailsRepository = new FakeTrailsRepository();
    fakeBlocksRepository = new FakeBlocksRepository();
    fakeUserBlocksRepository = new FakeUserBlocksRepository();
    fakeClassesRepository = new FakeClassesRepository();
    fakeUserClassesRepository = new FakeUserClassesRepository();

    createUserPlaylistsService = new CreateUserPlaylistsService(
      fakeUsersRepository,
      fakeUserTrailsRepository,
      fakeUserPlaylistsRepository,
      fakePlaylistsRepository,
      fakeTrailsRepository,
      fakeBlocksRepository,
      fakeUserBlocksRepository,
      fakeClassesRepository,
      fakeUserClassesRepository,
    );

    createUserTrail = new CreateUserTrailService(
      fakeUserTrailsRepository,
      fakeTrailsRepository,
      fakeUsersRepository,
      createUserPlaylistsService,
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
