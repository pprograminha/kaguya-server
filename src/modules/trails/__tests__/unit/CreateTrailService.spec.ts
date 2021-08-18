import { FakeTrailsRepository } from '@modules/trails/infra/typeorm/repositories/fakes/FakeTrailsRepository';
import { CreateTrailService } from '@modules/trails/services/CreateTrailService';
import { AppError } from '@shared/errors/AppError';
import { FakeStorageProvider } from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';

let fakeStorageProvider: FakeStorageProvider;
let fakeTrailsRepository: FakeTrailsRepository;
let createTrailService: CreateTrailService;

describe('CreateTrail', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeTrailsRepository = new FakeTrailsRepository();

    createTrailService = new CreateTrailService(
      fakeTrailsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a trail', async () => {
    const trail = await createTrailService.execute({
      description: 'XX xxx xxx X XX xxx',
      name: 'Xxxxx',
      avatar: 'xxxx.xxx',
    });

    expect(trail.avatar).toBe('xxxx.xxx');
    expect(trail).toHaveProperty('id');
    expect(trail).toHaveProperty('description');
  });

  it('should not be able to create if non-existing avatar', async () => {
    await expect(
      createTrailService.execute({
        description: 'XX xxx xxx X XX xxx',
        name: 'Xxxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
