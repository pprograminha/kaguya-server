import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { ListAllUserPlaylistsFromTrailService } from '@modules/playlists/services/ListAllUserPlaylistsFromTrailService';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { InMemoryPlaylistsRepository } from '../in-memory/in-memory-playlists-repository';
import { InMemoryUserPlaylistsRepository } from '../in-memory/in-memory-user-playlists-repository';

let inMemoryPlaylistsRepository: InMemoryPlaylistsRepository;
let fakeUsersRepository: FakeUsersRepository;
let inMemoryUserPlaylistsRepository: InMemoryUserPlaylistsRepository;
let fakeTrailsRepository: FakeTrailsRepository;

let listAllUserPlaylistsFromTrail: ListAllUserPlaylistsFromTrailService;

describe('ListAllUserPlaylistsFromTrail', () => {
  beforeEach(() => {
    inMemoryPlaylistsRepository = new InMemoryPlaylistsRepository();
    fakeTrailsRepository = new FakeTrailsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    inMemoryUserPlaylistsRepository = new InMemoryUserPlaylistsRepository();

    listAllUserPlaylistsFromTrail = new ListAllUserPlaylistsFromTrailService(
      fakeUsersRepository,
      inMemoryUserPlaylistsRepository,
      fakeTrailsRepository,
    );
  });

  it('should be able to list all user playlists from trail', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Xxxx Xxx',
      email: 'xxxx@xxxx.xxx',
      password: '000000',
      username: 'xxx0xxxx0',
    });

    const trail = await fakeTrailsRepository.create({
      name: 'Xxxxx',
      description: 'Xxxxx xxxxx',
    });

    const playlist = await inMemoryPlaylistsRepository.create({
      name: 'Xxxxx',
      description: 'Xxxxx xxxxx',
      trail_id: trail.id,
    });

    const userPlaylist = await inMemoryUserPlaylistsRepository.create({
      user_id: user.id,
      trail_id: trail.id,
      playlist_id: playlist.id,
    });

    const userPlaylists = await listAllUserPlaylistsFromTrail.execute({
      trail_id: trail.id,
      user_id: user.id,
    });

    expect(userPlaylists).toEqual([userPlaylist]);
    expect(userPlaylists).toHaveLength(1);
  });

  it('should not be able to list all user playlists with non-existent user', async () => {
    const trail = await fakeTrailsRepository.create({
      name: 'Xxxxx',
      description: 'Xxxxx xxxxx',
    });

    await expect(
      listAllUserPlaylistsFromTrail.execute({
        user_id: 'non-existing-user-id',
        trail_id: trail.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to list all user playlists with non-existent trail', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Xxxx Xxx',
      email: 'xxxx@xxxx.xxx',
      password: '000000',
      username: 'xxx0xxxx0',
    });

    await expect(
      listAllUserPlaylistsFromTrail.execute({
        user_id: user.id,
        trail_id: 'non-existing-trail-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
