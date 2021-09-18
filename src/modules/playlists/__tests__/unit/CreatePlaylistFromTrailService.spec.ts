import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { CreatePlaylistFromTrailService } from '@modules/playlists/services/CreatePlaylistFromTrailService';
import { AppError } from '@shared/errors/AppError';
import { FakePlaylistsRepository } from '../fakes/FakePlaylistsRepository';

let fakeTrailsRepository: FakeTrailsRepository;
let fakePlaylistsRepository: FakePlaylistsRepository;
let createPlaylistFromTrail: CreatePlaylistFromTrailService;

describe('CreatePlaylistFromTrail', () => {
  beforeEach(() => {
    fakeTrailsRepository = new FakeTrailsRepository();
    fakePlaylistsRepository = new FakePlaylistsRepository();

    createPlaylistFromTrail = new CreatePlaylistFromTrailService(
      fakeTrailsRepository,
      fakePlaylistsRepository,
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
