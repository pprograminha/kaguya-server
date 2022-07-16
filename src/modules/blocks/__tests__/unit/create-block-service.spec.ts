import { CreateBlockService } from '@modules/blocks/services/create-block-service';
import { AppError } from '@shared/errors/app-error';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { InMemoryPlaylistsRepository } from '@modules/playlists/__tests__/in-memory/in-memory-playlists-repository';
import { InMemoryTrailsRepository } from '@modules/trails/__tests__/in-memory/in-memory-trails-repository';
import { InMemoryBlocksRepository } from '../in-memory/in-memory-blocks-repository';
import { InMemoryUserBlocksRepository } from '../in-memory/in-memory-user-blocks-repository';

let inMemoryBlocksRepository: InMemoryBlocksRepository;
let inMemoryPlaylistsRepository: InMemoryPlaylistsRepository;
let inMemoryTrailsRepository: InMemoryTrailsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserBlocksRepository: InMemoryUserBlocksRepository;
let createBlock: CreateBlockService;

describe('CreateBlock', () => {
  beforeEach(() => {
    inMemoryBlocksRepository = new InMemoryBlocksRepository();
    inMemoryPlaylistsRepository = new InMemoryPlaylistsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUserBlocksRepository = new InMemoryUserBlocksRepository();
    inMemoryTrailsRepository = new InMemoryTrailsRepository();

    createBlock = new CreateBlockService(
      inMemoryPlaylistsRepository,
      inMemoryBlocksRepository,
      inMemoryUsersRepository,
      inMemoryUserBlocksRepository,
    );
  });

  it('should be able to create a trail', async () => {
    const trail = await inMemoryTrailsRepository.create({
      description: 'Xxxxx xxxx',
      name: 'Xxxxx',
      slug: 'xxxxx',
    });

    const playlist = await inMemoryPlaylistsRepository.create({
      description: 'Xxxxx xxxx',
      slug: 'xxxxx',
      name: 'Xxxxx',
      trail_id: trail.id,
    });

    const block = await createBlock.execute({
      name: 'Xxxxx',
      slug: 'xxxxx',
      playlist_id: playlist.id,
    });

    expect(block.name).toBe('Xxxxx');
    expect(block).toHaveProperty('id');
  });

  it('should not be able to create a trail with non-existing playlist', async () => {
    await expect(
      createBlock.execute({
        name: 'Xxxxx',
        playlist_id: 'non-existing-playlist',
        slug: 'xxxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
