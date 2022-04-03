import { ListAllBlocksFromPlaylistService } from '@modules/blocks/services/list-all-blocks-from-playlist-service';
import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { InMemoryPlaylistsRepository } from '@modules/playlists/__tests__/in-memory/in-memory-playlists-repository';
import { InMemoryBlocksRepository } from '../in-memory/in-memory-blocks-repository';

let inMemoryPlaylistsRepository: InMemoryPlaylistsRepository;
let inMemoryBlocksRepository: InMemoryBlocksRepository;
let fakeTrailsRepository: FakeTrailsRepository;
let fakeUsersRepository: FakeUsersRepository;

let listAllBlocksFromPlaylist: ListAllBlocksFromPlaylistService;

describe('ListAllBlocksFromPlaylist', () => {
  beforeEach(() => {
    inMemoryPlaylistsRepository = new InMemoryPlaylistsRepository();
    fakeTrailsRepository = new FakeTrailsRepository();
    inMemoryBlocksRepository = new InMemoryBlocksRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listAllBlocksFromPlaylist = new ListAllBlocksFromPlaylistService(
      inMemoryPlaylistsRepository,
      inMemoryBlocksRepository,
    );
  });

  it('should be able to list all playlists from trail', async () => {
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxxx xxxx',
      name: 'Xxxxx',
    });

    const playlist = await inMemoryPlaylistsRepository.create({
      description: 'Xxxxx xxxx',
      name: 'Xxxxx',
      trail_id: trail.id,
    });

    const user = await fakeUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'Xxxxx',
      password: '00000000',
      username: 'xxxxx',
    });

    const blocksAmount = Array.from(
      {
        length: 5,
      },
      (value, key) => key + 1,
    );

    const promises = blocksAmount.map(async () => {
      return inMemoryBlocksRepository.create({
        name: 'Xxxxx',
        playlist_id: playlist.id,
      });
    });

    const blocksCreated = await Promise.all(promises);

    await inMemoryPlaylistsRepository.create({
      description: 'Xxxxx xxxx',
      name: 'Xxxxx',
      trail_id: trail.id,
    });

    jest
      .spyOn(inMemoryBlocksRepository, 'findAllBlocksFromPlaylist')
      .mockImplementationOnce(async () =>
        blocksCreated.map(block => ({
          ...block,
          classes: [],
          user_blocks: [],
        })),
      );

    const blocks = await listAllBlocksFromPlaylist.execute({
      playlist_id: playlist.id,
      user_id: user.id,
    });

    expect(blocks.length).toEqual(blocksCreated.length);
  });

  it('should not be able to list all blocks from playlist if non-existing playlist', async () => {
    const user = await fakeUsersRepository.create({
      email: 'xxxxxx@xxxx.xxx',
      name: 'Xxxxx',
      password: '00000000',
      username: 'xxxxx',
    });

    await expect(
      listAllBlocksFromPlaylist.execute({
        playlist_id: 'non-existing-playlist',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
