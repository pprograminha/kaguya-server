import { FakePlaylistsRepository } from '@modules/playlists/__tests__/fakes/FakePlaylistsRepository';
import { ListAllBlocksFromPlaylistService } from '@modules/blocks/services/ListAllBlocksFromPlaylistService';
import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeBlocksRepository } from '../fakes/FakeBlocksRepository';

let fakePlaylistsRepository: FakePlaylistsRepository;
let fakeBlocksRepository: FakeBlocksRepository;
let fakeTrailsRepository: FakeTrailsRepository;

let listAllBlocksFromPlaylist: ListAllBlocksFromPlaylistService;

describe('ListAllBlocksFromPlaylist', () => {
  beforeEach(() => {
    fakePlaylistsRepository = new FakePlaylistsRepository();
    fakeTrailsRepository = new FakeTrailsRepository();
    fakeBlocksRepository = new FakeBlocksRepository();

    listAllBlocksFromPlaylist = new ListAllBlocksFromPlaylistService(
      fakePlaylistsRepository,
      fakeBlocksRepository,
    );
  });

  it('should be able to list all playlists from trail', async () => {
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxxx xxxx',
      name: 'Xxxxx',
    });

    const playlist = await fakePlaylistsRepository.create({
      description: 'Xxxxx xxxx',
      name: 'Xxxxx',
      trail_id: trail.id,
    });

    const blocksAmount = Array.from(
      {
        length: 5,
      },
      (value, key) => key + 1,
    );

    const promises = blocksAmount.map(async () => {
      return fakeBlocksRepository.create({
        name: 'Xxxxx',
        playlist_id: playlist.id,
      });
    });

    const blocksCreated = await Promise.all(promises);

    await fakePlaylistsRepository.create({
      description: 'Xxxxx xxxx',
      name: 'Xxxxx',
      trail_id: trail.id,
    });

    const blocks = await listAllBlocksFromPlaylist.execute(playlist.id);

    expect(blocks).toEqual([...blocksCreated]);
    expect(blocks).toEqual(expect.arrayContaining([...blocksCreated]));
  });

  it('should not be able to list all blocks from playlist if non-existing playlist', async () => {
    await expect(
      listAllBlocksFromPlaylist.execute('non-existing-playlist'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
