import { CreateUserTrailService } from '@modules/trails/services/create-user-trail-service';
import { AppError } from '@shared/errors/app-error';
import { CreateUserPlaylistsService } from '@modules/playlists/services/create-user-playlists-service';

import { InMemoryBlocksRepository } from '@modules/blocks/__tests__/in-memory/in-memory-blocks-repository';

import { InMemoryClassesRepository } from '@modules/classes/__tests__/in-memory/in-memory-classes-repository';
import { InMemoryUserClassesRepository } from '@modules/classes/__tests__/in-memory/in-memory-user-classes-repository';

import { InMemoryUserBlocksRepository } from '@modules/blocks/__tests__/in-memory/in-memory-user-blocks-repository';

import { InMemoryUserPlaylistsRepository } from '@modules/playlists/__tests__/in-memory/in-memory-user-playlists-repository';
import { InMemoryPlaylistsRepository } from '@modules/playlists/__tests__/in-memory/in-memory-playlists-repository';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { InMemoryUserTrailsRepository } from '../in-memory/in-memory-user-trails-repository';
import { InMemoryTrailsRepository } from '../in-memory/in-memory-trails-repository';

let inMemoryTrailsRepository: InMemoryTrailsRepository;
let inMemoryUserTrailsRepository: InMemoryUserTrailsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserPlaylistsRepository: InMemoryUserPlaylistsRepository;
let inMemoryPlaylistsRepository: InMemoryPlaylistsRepository;
let inMemoryBlocksRepository: InMemoryBlocksRepository;
let inMemoryUserBlocksRepository: InMemoryUserBlocksRepository;
let inMemoryClassesRepository: InMemoryClassesRepository;
let inMemoryUserClassesRepository: InMemoryUserClassesRepository;

let createUserTrail: CreateUserTrailService;
let createUserPlaylistsService: CreateUserPlaylistsService;

describe('CreateUserTrail', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUserTrailsRepository = new InMemoryUserTrailsRepository();
    inMemoryUserPlaylistsRepository = new InMemoryUserPlaylistsRepository();
    inMemoryPlaylistsRepository = new InMemoryPlaylistsRepository();
    inMemoryTrailsRepository = new InMemoryTrailsRepository();
    inMemoryBlocksRepository = new InMemoryBlocksRepository();
    inMemoryUserBlocksRepository = new InMemoryUserBlocksRepository();
    inMemoryClassesRepository = new InMemoryClassesRepository();
    inMemoryUserClassesRepository = new InMemoryUserClassesRepository();

    createUserPlaylistsService = new CreateUserPlaylistsService(
      inMemoryUsersRepository,
      inMemoryUserTrailsRepository,
      inMemoryUserPlaylistsRepository,
      inMemoryPlaylistsRepository,
      inMemoryTrailsRepository,
      inMemoryBlocksRepository,
      inMemoryUserBlocksRepository,
      inMemoryClassesRepository,
      inMemoryUserClassesRepository,
    );

    createUserTrail = new CreateUserTrailService(
      inMemoryUserTrailsRepository,
      inMemoryTrailsRepository,
      inMemoryUsersRepository,
      createUserPlaylistsService,
    );
  });

  it('should be able to create a user trail', async () => {
    const trail = await inMemoryTrailsRepository.create({
      description: 'Xxxx xxxx x',
      name: 'Xxxx',
    });

    const user = await inMemoryUsersRepository.create({
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
    const user = await inMemoryUsersRepository.create({
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
    const trail = await inMemoryTrailsRepository.create({
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
    const trail = await inMemoryTrailsRepository.create({
      description: 'Xxxx xxxx x',
      name: 'Xxxx',
    });

    const user = await inMemoryUsersRepository.create({
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
    const trail = await inMemoryTrailsRepository.create({
      description: 'Xxxx xxxx x',
      name: 'Xxxx',
    });

    const user = await inMemoryUsersRepository.create({
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
    const trail = await inMemoryTrailsRepository.create({
      description: 'Xxxx xxxx x',
      name: 'Xxxx',
    });

    const user = await inMemoryUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    jest
      .spyOn(inMemoryUserTrailsRepository, 'findById')
      .mockImplementationOnce(async () => undefined);

    await expect(
      createUserTrail.execute({
        trail_id: trail.id,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});