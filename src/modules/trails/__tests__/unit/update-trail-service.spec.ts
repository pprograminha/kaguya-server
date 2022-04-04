import { UpdateTrailService } from '@modules/trails/services/update-trail-service';
import { AppError } from '@shared/errors/app-error';
import { InMemoryTrailsRepository } from '../in-memory/in-memory-trails-repository';

let inMemoryTrailsRepository: InMemoryTrailsRepository;
let updateTrail: UpdateTrailService;

describe('UpdateTrail', () => {
  beforeEach(() => {
    inMemoryTrailsRepository = new InMemoryTrailsRepository();

    updateTrail = new UpdateTrailService(inMemoryTrailsRepository);
  });

  it('should be able to update trail', async () => {
    const trail = await inMemoryTrailsRepository.create({
      description: 'Zzzzz Zzzz',
      name: 'Zzzz',
    });

    const trailUpdated = await updateTrail.execute({
      trail_id: trail.id,
      description: 'Xxxxx Xxxx',
      name: 'Xxxx',
    });

    expect(trailUpdated.name).toBe('Xxxx');
  });

  it('should not be able to update trail with non-existing trail', async () => {
    await expect(
      updateTrail.execute({
        trail_id: 'non-existing-trail',
        description: 'Xxxxx Xxxx',
        name: 'Xxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
