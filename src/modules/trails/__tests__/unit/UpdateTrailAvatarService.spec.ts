import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { UpdateTrailAvatarService } from '@modules/trails/services/UpdateTrailAvatarService';
import { AppError } from '@shared/errors/AppError';
import { FakeStorageProvider } from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';

let fakeTrailsRepository: FakeTrailsRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateTrailAvatar: UpdateTrailAvatarService;

describe('UpdateTrailAvatar', () => {
  beforeEach(() => {
    fakeTrailsRepository = new FakeTrailsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateTrailAvatar = new UpdateTrailAvatarService(
      fakeTrailsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update trail avatar', async () => {
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxxx Xxxx',
      name: 'Xxxx',
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
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxxx Xxxx',
      name: 'Xxxx',
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
