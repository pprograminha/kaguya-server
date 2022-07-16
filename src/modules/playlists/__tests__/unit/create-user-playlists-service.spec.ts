import { CreateUserPlaylistsService } from '@modules/playlists/services/create-user-playlists-service';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { AppError } from '@shared/errors/app-error';
import { InMemoryBlocksRepository } from '@modules/blocks/__tests__/in-memory/in-memory-blocks-repository';

import { InMemoryUserLessonsRepository } from '@modules/lessons/__tests__/in-memory/in-memory-user-lessons-repository';
import { InMemoryLessonsRepository } from '@modules/lessons/__tests__/in-memory/in-memory-lessons-repository';

import { InMemoryUserBlocksRepository } from '@modules/blocks/__tests__/in-memory/in-memory-user-blocks-repository';
import { InMemoryUserTrailsRepository } from '@modules/trails/__tests__/in-memory/in-memory-user-trails-repository';
import { InMemoryTrailsRepository } from '@modules/trails/__tests__/in-memory/in-memory-trails-repository';
import { InMemoryUserPlaylistsRepository } from '../in-memory/in-memory-user-playlists-repository';
import { InMemoryPlaylistsRepository } from '../in-memory/in-memory-playlists-repository';

let inMemoryPlaylistsRepository: InMemoryPlaylistsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserPlaylistsRepository: InMemoryUserPlaylistsRepository;
let inMemoryTrailsRepository: InMemoryTrailsRepository;
let inMemoryUserTrailsRepository: InMemoryUserTrailsRepository;
let inMemoryBlocksRepository: InMemoryBlocksRepository;
let inMemoryUserBlocksRepository: InMemoryUserBlocksRepository;
let inMemoryLessonsRepository: InMemoryLessonsRepository;
let inMemoryUserLessonsRepository: InMemoryUserLessonsRepository;

let createUserPlaylists: CreateUserPlaylistsService;

describe('CreatePlaylist', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUserTrailsRepository = new InMemoryUserTrailsRepository();
    inMemoryUserPlaylistsRepository = new InMemoryUserPlaylistsRepository();
    inMemoryPlaylistsRepository = new InMemoryPlaylistsRepository();
    inMemoryTrailsRepository = new InMemoryTrailsRepository();
    inMemoryBlocksRepository = new InMemoryBlocksRepository();
    inMemoryUserBlocksRepository = new InMemoryUserBlocksRepository();
    inMemoryLessonsRepository = new InMemoryLessonsRepository();
    inMemoryUserLessonsRepository = new InMemoryUserLessonsRepository();

    createUserPlaylists = new CreateUserPlaylistsService(
      inMemoryUsersRepository,
      inMemoryUserTrailsRepository,
      inMemoryUserPlaylistsRepository,
      inMemoryPlaylistsRepository,
      inMemoryTrailsRepository,
      inMemoryBlocksRepository,
      inMemoryUserBlocksRepository,
      inMemoryLessonsRepository,
      inMemoryUserLessonsRepository,
    );
  });

  it('should be able to create user playlists', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'Xxxx Xxx',
      email: 'xxxx@xxxx.xxx',
      password: '000000',
      username: 'xxx0xxxx0',
    });

    const trail = await inMemoryTrailsRepository.create({
      name: 'Xxxx Xxx',
      slug: 'xxxx-xxx',
      description: 'Xxxx Xxx',
    });

    await inMemoryUserTrailsRepository.create({
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
        slug: 'xxxx-xxx',
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
    const trail = await inMemoryTrailsRepository.create({
      name: 'Xxxx Xxx',
      slug: 'xxxx-xxx',
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
    const user = await inMemoryUsersRepository.create({
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
