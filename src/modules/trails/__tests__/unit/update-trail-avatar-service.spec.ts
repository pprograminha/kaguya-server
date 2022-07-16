import { UpdateTrailAvatarService } from '@modules/trails/services/update-trail-avatar-service';
import { AppError } from '@shared/errors/app-error';
import { InMemoryStorageProvider } from '@shared/providers/storage-provider/in-memory/in-memory-storage-provider';
import { InMemoryTrailsRepository } from '../in-memory/in-memory-trails-repository';

let inMemoryTrailsRepository: InMemoryTrailsRepository;
let inMemoryStorageProvider: InMemoryStorageProvider;
let updateTrailAvatar: UpdateTrailAvatarService;

describe('UpdateTrailAvatar', () => {
  beforeEach(() => {
    inMemoryTrailsRepository = new InMemoryTrailsRepository();
    inMemoryStorageProvider = new InMemoryStorageProvider();

    updateTrailAvatar = new UpdateTrailAvatarService(
      inMemoryTrailsRepository,
      inMemoryStorageProvider,
    );
  });

  it('should be able to update trail avatar', async () => {
    const trail = await inMemoryTrailsRepository.create({
      description: 'Xxxxx Xxxx',
      name: 'Xxxx',
      slug: 'xxxx',
    });

    await updateTrailAvatar.execute({
      trail_id: trail.id,
      avatar: 'xxxxxxx.xxx',
    });

    const trailUpdated = await updateTrailAvatar.execute({
      trail_id: trail.id,
      avatar: 'xxxxxx.xxx',
    });

    expect(trailUpdated.avatar).toBe('xxxxxx.xxx');
  });

  it('should not be able to update trail avatar if not entered', async () => {
    const trail = await inMemoryTrailsRepository.create({
      description: 'Xxxxx Xxxx',
      name: 'Xxxx',
      slug: 'xxxx',
    });

    expect(
      updateTrailAvatar.execute({
        trail_id: trail.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update trail avatar if non-existing trail', async () => {
    expect(
      updateTrailAvatar.execute({
        trail_id: 'non-existing-trail',
        avatar: 'xxxxx.xxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
