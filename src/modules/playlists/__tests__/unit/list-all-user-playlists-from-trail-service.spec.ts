import { ListAllUserPlaylistsFromTrailService } from '@modules/playlists/services/list-all-user-playlists-from-trail-service';
import { InMemoryTrailsRepository } from '@modules/trails/__tests__/in-memory/in-memory-trails-repository';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { AppError } from '@shared/errors/app-error';
import { InMemoryPlaylistsRepository } from '../in-memory/in-memory-playlists-repository';
import { InMemoryUserPlaylistsRepository } from '../in-memory/in-memory-user-playlists-repository';

let inMemoryPlaylistsRepository: InMemoryPlaylistsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserPlaylistsRepository: InMemoryUserPlaylistsRepository;
let inMemoryTrailsRepository: InMemoryTrailsRepository;

let listAllUserPlaylistsFromTrail: ListAllUserPlaylistsFromTrailService;

describe('ListAllUserPlaylistsFromTrail', () => {
  beforeEach(() => {
    inMemoryPlaylistsRepository = new InMemoryPlaylistsRepository();
    inMemoryTrailsRepository = new InMemoryTrailsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUserPlaylistsRepository = new InMemoryUserPlaylistsRepository();

    listAllUserPlaylistsFromTrail = new ListAllUserPlaylistsFromTrailService(
      inMemoryUsersRepository,
      inMemoryUserPlaylistsRepository,
      inMemoryTrailsRepository,
    );
  });

  it('should be able to list all user playlists from trail', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'Xxxx Xxx',
      email: 'xxxx@xxxx.xxx',
      password: '000000',
      username: 'xxx0xxxx0',
    });

    const trail = await inMemoryTrailsRepository.create({
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
    const trail = await inMemoryTrailsRepository.create({
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
    const user = await inMemoryUsersRepository.create({
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
