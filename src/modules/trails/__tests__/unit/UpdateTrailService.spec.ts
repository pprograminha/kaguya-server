import { FakeTrailsRepository } from '@modules/trails/infra/typeorm/repositories/fakes/FakeTrailsRepository';
import { UpdateTrailService } from '@modules/trails/services/UpdateTrailService';
import { AppError } from '@shared/errors/AppError';

let fakeTrailsRepository: FakeTrailsRepository;
let updateTrail: UpdateTrailService;

describe('UpdateTrail', () => {
  beforeEach(() => {
    fakeTrailsRepository = new FakeTrailsRepository();

    updateTrail = new UpdateTrailService(fakeTrailsRepository);
  });

  it('should be able to update trail', async () => {
    const trail = await fakeTrailsRepository.create({
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
