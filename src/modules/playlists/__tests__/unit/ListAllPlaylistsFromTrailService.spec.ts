import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { ListAllPlaylistsFromTrailService } from '@modules/playlists/services/ListAllPlaylistsFromTrailService';
import { AppError } from '@shared/errors/AppError';
import { FakePlaylistsRepository } from '../fakes/FakePlaylistsRepository';

let fakePlaylistsRepository: FakePlaylistsRepository;
let fakeTrailsRepository: FakeTrailsRepository;

let listAllPlaylistsFromTrail: ListAllPlaylistsFromTrailService;

describe('ListAllPlaylistsFromTrail', () => {
  beforeEach(() => {
    fakePlaylistsRepository = new FakePlaylistsRepository();
    fakeTrailsRepository = new FakeTrailsRepository();

    listAllPlaylistsFromTrail = new ListAllPlaylistsFromTrailService(
      fakePlaylistsRepository,
      fakeTrailsRepository,
    );
  });

  it('should be able to list all playlists from trail', async () => {
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxxx xxxx',
      name: 'Xxxxx',
    });

    const playlistsAmount = Array.from(
      {
        length: 5,
      },
      (value, key) => key + 1,
    );

    const promises = playlistsAmount.map(async () => {
      return fakePlaylistsRepository.create({
        description: 'Xxxxx xxxx',
        name: 'Xxxxx',
        trail_id: trail.id,
      });
    });

    const playlistsCreated = await Promise.all(promises);

    await fakePlaylistsRepository.create({
      description: 'Xxxxx xxxx',
      name: 'Xxxxx',
      trail_id: trail.id,
    });

    const playlists = await listAllPlaylistsFromTrail.execute(trail.id);

    expect(playlists).toEqual(expect.arrayContaining([...playlistsCreated]));
  });
  it('should not be able to list all playlists from trail if non-existing trail', async () => {
    await expect(
      listAllPlaylistsFromTrail.execute('non-existing-trail'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
