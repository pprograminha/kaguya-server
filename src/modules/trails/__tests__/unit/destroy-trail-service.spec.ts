import { DestroyTrailService } from '@modules/trails/services/destroy-trail-service';
import { AppError } from '@shared/errors/app-error';
import { InMemoryStorageProvider } from '@shared/providers/storage-provider/in-memory/in-memory-storage-provider';

import { InMemoryTrailsRepository } from '../in-memory/in-memory-trails-repository';

let inMemoryTrailsRepository: InMemoryTrailsRepository;
let inMemoryStorageProvider: InMemoryStorageProvider;

let destroyTrailService: DestroyTrailService;

describe('DestroyTrail', () => {
  beforeEach(() => {
    inMemoryTrailsRepository = new InMemoryTrailsRepository();
    inMemoryStorageProvider = new InMemoryStorageProvider();

    destroyTrailService = new DestroyTrailService(
      inMemoryTrailsRepository,
      inMemoryStorageProvider,
    );
  });

  it('should be able to delete a trail', async () => {
    const trail = await inMemoryTrailsRepository.create({
      name: 'Xxxx',
      description: 'Xxxx',
    });

    const destroyById = jest.spyOn(inMemoryTrailsRepository, 'destroyById');

    await destroyTrailService.execute(trail.id);

    expect(destroyById).toHaveBeenCalledWith(trail.id);
  });

  it('should not be able to create a trail with non-existing trail', async () => {
    await expect(
      destroyTrailService.execute('non-existing-trail'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
