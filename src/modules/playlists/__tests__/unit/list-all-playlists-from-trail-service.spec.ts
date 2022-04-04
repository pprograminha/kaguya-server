import { ListAllPlaylistsFromTrailService } from '@modules/playlists/services/list-all-playlists-from-trail-service';
import { InMemoryTrailsRepository } from '@modules/trails/__tests__/in-memory/in-memory-trails-repository';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { AppError } from '@shared/errors/app-error';
import { InMemoryPlaylistsRepository } from '../in-memory/in-memory-playlists-repository';

let inMemoryPlaylistsRepository: InMemoryPlaylistsRepository;
let inMemoryTrailsRepository: InMemoryTrailsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;

let listAllPlaylistsFromTrail: ListAllPlaylistsFromTrailService;

describe('ListAllPlaylistsFromTrail', () => {
  beforeEach(() => {
    inMemoryPlaylistsRepository = new InMemoryPlaylistsRepository();
    inMemoryTrailsRepository = new InMemoryTrailsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();

    listAllPlaylistsFromTrail = new ListAllPlaylistsFromTrailService(
      inMemoryPlaylistsRepository,
      inMemoryTrailsRepository,
      inMemoryUsersRepository,
    );
  });

  it('should be able to list all trails from trail', async () => {
    const trail = await inMemoryTrailsRepository.create({
      description: 'Xxxxx xxxx',
      name: 'Xxxxx',
    });
    const user = await inMemoryUsersRepository.create({
      email: 'xxx@xxx.xxx',
      name: 'Xxxxx',
      password: '00000000',
      username: 'xxxxx',
    });

    const playlistsAmount = Array.from(
      {
        length: 5,
      },
      (value, key) => key + 1,
    );

    const promises = playlistsAmount.map(async () => {
      return inMemoryPlaylistsRepository.create({
        description: 'Xxxxx xxxx',
        name: 'Xxxxx',
        trail_id: trail.id,
      });
    });

    const playlistsCreated = await Promise.all(promises);

    await inMemoryPlaylistsRepository.create({
      description: 'Xxxxx xxxx',
      name: 'Xxxxx',
      trail_id: trail.id,
    });

    jest
      .spyOn(inMemoryPlaylistsRepository, 'findAllPlaylistsFromTrail')
      .mockImplementationOnce(async () => [
        ...playlistsCreated.map(playlist => ({
          ...playlist,
          user_playlists: [],
        })),
      ]);

    const playlists = await listAllPlaylistsFromTrail.execute({
      trail_id: trail.id,
      user_id: user.id,
    });

    expect(playlists.length).toEqual(playlistsCreated.length);
    expect(playlists[0].id).toEqual(playlistsCreated[0].id);
  });
  it('should not be able to list all playlists from trail if non-existing trail', async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'xxx@xxx.xxx',
      name: 'Xxxxx',
      password: '00000000',
      username: 'xxxxx',
    });

    await expect(
      listAllPlaylistsFromTrail.execute({
        trail_id: 'non-existing-trail-id',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
