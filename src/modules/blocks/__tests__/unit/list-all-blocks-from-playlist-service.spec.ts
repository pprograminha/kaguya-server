import { ListAllBlocksFromPlaylistService } from '@modules/blocks/services/list-all-blocks-from-playlist-service';
import { AppError } from '@shared/errors/app-error';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { InMemoryPlaylistsRepository } from '@modules/playlists/__tests__/in-memory/in-memory-playlists-repository';
import { InMemoryTrailsRepository } from '@modules/trails/__tests__/in-memory/in-memory-trails-repository';
import { InMemoryBlocksRepository } from '../in-memory/in-memory-blocks-repository';

let inMemoryPlaylistsRepository: InMemoryPlaylistsRepository;
let inMemoryBlocksRepository: InMemoryBlocksRepository;
let inMemoryTrailsRepository: InMemoryTrailsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;

let listAllBlocksFromPlaylist: ListAllBlocksFromPlaylistService;

describe('ListAllBlocksFromPlaylist', () => {
  beforeEach(() => {
    inMemoryPlaylistsRepository = new InMemoryPlaylistsRepository();
    inMemoryTrailsRepository = new InMemoryTrailsRepository();
    inMemoryBlocksRepository = new InMemoryBlocksRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();

    listAllBlocksFromPlaylist = new ListAllBlocksFromPlaylistService(
      inMemoryPlaylistsRepository,
      inMemoryBlocksRepository,
      inMemoryUsersRepository,
    );
  });

  it('should be able to list all playlists from trail', async () => {
    const trail = await inMemoryTrailsRepository.create({
      description: 'Xxxxx xxxx',
      slug: 'xxxxx',
      name: 'Xxxxx',
    });

    const playlist = await inMemoryPlaylistsRepository.create({
      description: 'Xxxxx xxxx',
      slug: 'xxxxx',
      name: 'Xxxxx',
      trail_id: trail.id,
    });

    const user = await inMemoryUsersRepository.create({
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
        slug: 'xxxxx',
      });
    });

    const blocksCreated = await Promise.all(promises);

    await inMemoryPlaylistsRepository.create({
      description: 'Xxxxx xxxx',
      slug: 'xxxxx',
      name: 'Xxxxx',
      trail_id: trail.id,
    });

    jest
      .spyOn(inMemoryBlocksRepository, 'findAllBlocksFromPlaylist')
      .mockImplementationOnce(async () =>
        blocksCreated.map(block => ({
          ...block,
          lessons: [],
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
    const user = await inMemoryUsersRepository.create({
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
