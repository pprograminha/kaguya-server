import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { CreateUserPlaylistsService } from '@modules/playlists/services/CreateUserPlaylistsService';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeUserTrailsRepository } from '@modules/trails/__tests__/fakes/FakeUserTrailsRepository';
import { InMemoryBlocksRepository } from '@modules/blocks/__tests__/in-memory/in-memory-blocks-repository';

import { InMemoryUserClassesRepository } from '@modules/classes/__tests__/in-memory/in-memory-user-classes-repository';
import { InMemoryClassesRepository } from '@modules/classes/__tests__/in-memory/in-memory-classes-repository';

import { InMemoryUserBlocksRepository } from '@modules/blocks/__tests__/in-memory/in-memory-user-blocks-repository';
import { InMemoryUserPlaylistsRepository } from '../in-memory/in-memory-user-playlists-repository';
import { InMemoryPlaylistsRepository } from '../in-memory/in-memory-playlists-repository';

let inMemoryPlaylistsRepository: InMemoryPlaylistsRepository;
let fakeUsersRepository: FakeUsersRepository;
let inMemoryUserPlaylistsRepository: InMemoryUserPlaylistsRepository;
let fakeTrailsRepository: FakeTrailsRepository;
let fakeUserTrailsRepository: FakeUserTrailsRepository;
let inMemoryBlocksRepository: InMemoryBlocksRepository;
let inMemoryUserBlocksRepository: InMemoryUserBlocksRepository;
let inMemoryClassesRepository: InMemoryClassesRepository;
let inMemoryUserClassesRepository: InMemoryUserClassesRepository;

let createUserPlaylists: CreateUserPlaylistsService;

describe('CreatePlaylist', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTrailsRepository = new FakeUserTrailsRepository();
    inMemoryUserPlaylistsRepository = new InMemoryUserPlaylistsRepository();
    inMemoryPlaylistsRepository = new InMemoryPlaylistsRepository();
    fakeTrailsRepository = new FakeTrailsRepository();
    inMemoryBlocksRepository = new InMemoryBlocksRepository();
    inMemoryUserBlocksRepository = new InMemoryUserBlocksRepository();
    inMemoryClassesRepository = new InMemoryClassesRepository();
    inMemoryUserClassesRepository = new InMemoryUserClassesRepository();

    createUserPlaylists = new CreateUserPlaylistsService(
      fakeUsersRepository,
      fakeUserTrailsRepository,
      inMemoryUserPlaylistsRepository,
      inMemoryPlaylistsRepository,
      fakeTrailsRepository,
      inMemoryBlocksRepository,
      inMemoryUserBlocksRepository,
      inMemoryClassesRepository,
      inMemoryUserClassesRepository,
    );
  });

  it('should be able to create user playlists', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Xxxx Xxx',
      email: 'xxxx@xxxx.xxx',
      password: '000000',
      username: 'xxx0xxxx0',
    });

    const trail = await fakeTrailsRepository.create({
      name: 'Xxxx Xxx',
      description: 'Xxxx Xxx',
    });

    await fakeUserTrailsRepository.create({
      trail_id: trail.id,
      user_id: user.id,
    });

    const playlistsAmount = Array.from(
      {
        length: 10,
      },
      (value, key) => key + 1,
    );

    const promises = playlistsAmount.map(async () => {
      return inMemoryPlaylistsRepository.create({
        name: 'Xxxx Xxx',
        description: 'Xxxx Xxx',
        trail_id: trail.id,
      });
    });

    await Promise.all(promises);

    const userPlaylistsCreated = await createUserPlaylists.execute({
      user_id: user.id,
      trail_id: trail.id,
    });

    expect(userPlaylistsCreated).toHaveLength(playlistsAmount.length);
  });

  it('should not be able to create user playlists with non-existent user', async () => {
    const trail = await fakeTrailsRepository.create({
      name: 'Xxxx Xxx',
      description: 'Xxxx Xxx',
    });

    await expect(
      createUserPlaylists.execute({
        user_id: 'non-existing-user-id',
        trail_id: trail.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create user playlists with non-existent trail', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Xxxx Xxx',
      email: 'xxxx@xxxx.xxx',
      password: '000000',
      username: 'xxx0xxxx0',
    });

    await expect(
      createUserPlaylists.execute({
        user_id: user.id,
        trail_id: 'non-existing-trail-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
