import { FakePlaylistsRepository } from '@modules/playlists/__tests__/fakes/FakePlaylistsRepository';
import { CreateBlockService } from '@modules/blocks/services/CreateBlockService';
import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeBlocksRepository } from '../fakes/FakeBlocksRepository';

let fakeBlocksRepository: FakeBlocksRepository;
let fakePlaylistsRepository: FakePlaylistsRepository;
let fakeTrailsRepository: FakeTrailsRepository;
let createBlock: CreateBlockService;

describe('CreateBlock', () => {
  beforeEach(() => {
    fakeBlocksRepository = new FakeBlocksRepository();
    fakePlaylistsRepository = new FakePlaylistsRepository();
    fakeTrailsRepository = new FakeTrailsRepository();

    createBlock = new CreateBlockService(
      fakePlaylistsRepository,
      fakeBlocksRepository,
    );
  });

  it('should be able to create a trail', async () => {
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxxx xxxx',
      name: 'Xxxxx',
    });

    const playlist = await fakePlaylistsRepository.create({
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
