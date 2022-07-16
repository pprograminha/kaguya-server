import { CreatePlaylistFromTrailService } from '@modules/playlists/services/create-playlist-from-trail-service';
import { AppError } from '@shared/errors/app-error';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { InMemoryTrailsRepository } from '@modules/trails/__tests__/in-memory/in-memory-trails-repository';
import { InMemoryPlaylistsRepository } from '../in-memory/in-memory-playlists-repository';
import { InMemoryUserPlaylistsRepository } from '../in-memory/in-memory-user-playlists-repository';

let inMemoryTrailsRepository: InMemoryTrailsRepository;
let inMemoryPlaylistsRepository: InMemoryPlaylistsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserPlaylistsRepository: InMemoryUserPlaylistsRepository;

let createPlaylistFromTrail: CreatePlaylistFromTrailService;

describe('CreatePlaylistFromTrail', () => {
  beforeEach(() => {
    inMemoryTrailsRepository = new InMemoryTrailsRepository();
    inMemoryPlaylistsRepository = new InMemoryPlaylistsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUserPlaylistsRepository = new InMemoryUserPlaylistsRepository();

    createPlaylistFromTrail = new CreatePlaylistFromTrailService(
      inMemoryTrailsRepository,
      inMemoryPlaylistsRepository,
      inMemoryUsersRepository,
      inMemoryUserPlaylistsRepository,
    );
  });

  it('should be able to create a playlist from a trail', async () => {
    const trail = await inMemoryTrailsRepository.create({
      name: 'Xxxxxx',
      slug: 'xxxxxx',
      description: 'Xxxxxx xxxxxx',
    });

    const playlist = await createPlaylistFromTrail.execute({
      trail_id: trail.id,
      name: 'Xxxxxx',
      slug: 'xxxxxx',
      description: 'Xxxxxx xxxxxx',
    });

    expect(playlist).toHaveProperty('id');
    expect(playlist.name).toBe('Xxxxxx');
    expect(playlist.description).toBe('Xxxxxx xxxxxx');
    expect(playlist.trail_id).toBe(trail.id);
  });

  it('should not be able to create an playlist with non-existent trail', async () => {
    await expect(
      createPlaylistFromTrail.execute({
        trail_id: 'non-existing-trail-id',
        name: 'Xxxxxx',
        slug: 'xxxxxx',
        description: 'Xxxxxx xxxxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
