import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { CreateUserPlaylistsService } from '@modules/playlists/services/CreateUserPlaylistsService';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { FakePlaylistsRepository } from '../fakes/FakePlaylistsRepository';
import { FakeUserPlaylistsRepository } from '../fakes/FakeUserPlaylistsRepository';

let fakePlaylistsRepository: FakePlaylistsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserPlaylistsRepository: FakeUserPlaylistsRepository;
let fakeTrailsRepository: FakeTrailsRepository;

let createUserPlaylists: CreateUserPlaylistsService;

describe('CreatePlaylist', () => {
  beforeEach(() => {
    fakePlaylistsRepository = new FakePlaylistsRepository();
    fakeTrailsRepository = new FakeTrailsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserPlaylistsRepository = new FakeUserPlaylistsRepository();

    createUserPlaylists = new CreateUserPlaylistsService(
      fakeUsersRepository,
      fakeUserPlaylistsRepository,
      fakePlaylistsRepository,
      fakeTrailsRepository,
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
