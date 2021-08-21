import { FakeTrailsRepository } from '@modules/trails/infra/typeorm/repositories/fakes/FakeTrailsRepository';
import { CreateTrailService } from '@modules/trails/services/CreateTrailService';

let fakeTrailsRepository: FakeTrailsRepository;
let createTrailService: CreateTrailService;

describe('CreateTrail', () => {
  beforeEach(() => {
    fakeTrailsRepository = new FakeTrailsRepository();

    createTrailService = new CreateTrailService(fakeTrailsRepository);
  });

  it('should be able to create a trail', async () => {
    const trail = await createTrailService.execute({
      description: 'XX xxx xxx X XX xxx',
      name: 'Xxxxx',
    });

    expect(trail.name).toBe('Xxxxx');
    expect(trail).toHaveProperty('description');
  });
});
