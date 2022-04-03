import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { CreatePlaylistFromTrailService } from '@modules/playlists/services/CreatePlaylistFromTrailService';
import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { InMemoryPlaylistsRepository } from '../in-memory/in-memory-playlists-repository';
import { InMemoryUserPlaylistsRepository } from '../in-memory/in-memory-user-playlists-repository';

let fakeTrailsRepository: FakeTrailsRepository;
let inMemoryPlaylistsRepository: InMemoryPlaylistsRepository;
let fakeUsersRepository: FakeUsersRepository;
let inMemoryUserPlaylistsRepository: InMemoryUserPlaylistsRepository;

let createPlaylistFromTrail: CreatePlaylistFromTrailService;

describe('CreatePlaylistFromTrail', () => {
  beforeEach(() => {
    fakeTrailsRepository = new FakeTrailsRepository();
    inMemoryPlaylistsRepository = new InMemoryPlaylistsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    inMemoryUserPlaylistsRepository = new InMemoryUserPlaylistsRepository();

    createPlaylistFromTrail = new CreatePlaylistFromTrailService(
      fakeTrailsRepository,
      inMemoryPlaylistsRepository,
      fakeUsersRepository,
      inMemoryUserPlaylistsRepository,
    );
  });

  it('should be able to create a playlist from a trail', async () => {
    const trail = await fakeTrailsRepository.create({
      name: 'Xxxxxx',
      description: 'Xxxxxx xxxxxx',
    });

    const playlist = await createPlaylistFromTrail.execute({
      trail_id: trail.id,
      name: 'Xxxxxx',
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
        description: 'Xxxxxx xxxxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
