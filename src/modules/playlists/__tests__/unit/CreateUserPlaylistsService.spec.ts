import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { CreateUserPlaylistsService } from '@modules/playlists/services/CreateUserPlaylistsService';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeUserTrailsRepository } from '@modules/trails/__tests__/fakes/FakeUserTrailsRepository';
import { FakeBlocksRepository } from '@modules/blocks/__tests__/fakes/FakeBlocksRepository';
import { FakeUserBlocksRepository } from '@modules/blocks/__tests__/fakes/FakeUserBlocksRepository';
import { FakeClassesRepository } from '@modules/classes/__tests__/fakes/FakeClassesRepository';
import { FakeUserClassesRepository } from '@modules/classes/__tests__/fakes/FakeUserClassesRepository';
import { FakeUserPlaylistsRepository } from '../fakes/FakeUserPlaylistsRepository';
import { FakePlaylistsRepository } from '../fakes/FakePlaylistsRepository';

let fakePlaylistsRepository: FakePlaylistsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserPlaylistsRepository: FakeUserPlaylistsRepository;
let fakeTrailsRepository: FakeTrailsRepository;
let fakeUserTrailsRepository: FakeUserTrailsRepository;
let fakeBlocksRepository: FakeBlocksRepository;
let fakeUserBlocksRepository: FakeUserBlocksRepository;
let fakeClassesRepository: FakeClassesRepository;
let fakeUserClassesRepository: FakeUserClassesRepository;

let createUserPlaylists: CreateUserPlaylistsService;

describe('CreatePlaylist', () => {
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

    createUserPlaylists = new CreateUserPlaylistsService(
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
      return fakePlaylistsRepository.create({
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
