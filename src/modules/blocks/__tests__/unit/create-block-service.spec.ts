import { CreateBlockService } from '@modules/blocks/services/create-block-service';
import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { InMemoryPlaylistsRepository } from '@modules/playlists/__tests__/in-memory/in-memory-playlists-repository';
import { InMemoryBlocksRepository } from '../in-memory/in-memory-blocks-repository';
import { InMemoryUserBlocksRepository } from '../in-memory/in-memory-user-blocks-repository';

let inMemoryBlocksRepository: InMemoryBlocksRepository;
let inMemoryPlaylistsRepository: InMemoryPlaylistsRepository;
let fakeTrailsRepository: FakeTrailsRepository;
let fakeUsersRepository: FakeUsersRepository;
let inMemoryUserBlocksRepository: InMemoryUserBlocksRepository;
let createBlock: CreateBlockService;

describe('CreateBlock', () => {
  beforeEach(() => {
    inMemoryBlocksRepository = new InMemoryBlocksRepository();
    inMemoryPlaylistsRepository = new InMemoryPlaylistsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    inMemoryUserBlocksRepository = new InMemoryUserBlocksRepository();
    fakeTrailsRepository = new FakeTrailsRepository();

    createBlock = new CreateBlockService(
      inMemoryPlaylistsRepository,
      inMemoryBlocksRepository,
      fakeUsersRepository,
      inMemoryUserBlocksRepository,
    );
  });

  it('should be able to create a trail', async () => {
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxxx xxxx',
      name: 'Xxxxx',
    });

    const playlist = await inMemoryPlaylistsRepository.create({
      description: 'Xxxxx xxxx',
      name: 'Xxxxx',
      trail_id: trail.id,
    });

    const block = await createBlock.execute({
      name: 'Xxxxx',
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
