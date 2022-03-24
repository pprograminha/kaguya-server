import { FakePlaylistsRepository } from '@modules/playlists/__tests__/fakes/FakePlaylistsRepository';
import { CreateBlockService } from '@modules/blocks/services/CreateBlockService';
import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { FakeBlocksRepository } from '../fakes/FakeBlocksRepository';
import { FakeUserBlocksRepository } from '../fakes/FakeUserBlocksRepository';

let fakeBlocksRepository: FakeBlocksRepository;
let fakePlaylistsRepository: FakePlaylistsRepository;
let fakeTrailsRepository: FakeTrailsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserBlocksRepository: FakeUserBlocksRepository;
let createBlock: CreateBlockService;

describe('CreateBlock', () => {
  beforeEach(() => {
    fakeBlocksRepository = new FakeBlocksRepository();
    fakePlaylistsRepository = new FakePlaylistsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserBlocksRepository = new FakeUserBlocksRepository();
    fakeTrailsRepository = new FakeTrailsRepository();

    createBlock = new CreateBlockService(
      fakePlaylistsRepository,
      fakeBlocksRepository,
      fakeUsersRepository,
      fakeUserBlocksRepository,
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
