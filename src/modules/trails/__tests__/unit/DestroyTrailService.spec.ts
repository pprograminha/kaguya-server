import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { DestroyTrailService } from '@modules/trails/services/DestroyTrailService';
import { AppError } from '@shared/errors/AppError';
import { FakeStorageProvider } from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';

let fakeTrailsRepository: FakeTrailsRepository;
let fakeStorageProvider: FakeStorageProvider;

let destroyTrailService: DestroyTrailService;

describe('DestroyTrail', () => {
  beforeEach(() => {
    fakeTrailsRepository = new FakeTrailsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    destroyTrailService = new DestroyTrailService(
      fakeTrailsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to delete a trail', async () => {
    const trail = await fakeTrailsRepository.create({
      name: 'Xxxx',
      description: 'Xxxx',
    });

    const destroyById = jest.spyOn(fakeTrailsRepository, 'destroyById');

    await destroyTrailService.execute(trail.id);

    expect(destroyById).toHaveBeenCalledWith(trail.id);
  });

  it('should not be able to create a trail with non-existing trail', async () => {
    await expect(
      destroyTrailService.execute('non-existing-trail'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
