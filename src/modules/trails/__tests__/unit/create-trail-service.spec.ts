import { CreateTrailService } from '@modules/trails/services/create-trail-service';
import { InMemoryTrailsRepository } from '../in-memory/in-memory-trails-repository';

let inMemoryTrailsRepository: InMemoryTrailsRepository;
let createTrailService: CreateTrailService;

describe('CreateTrail', () => {
  beforeEach(() => {
    inMemoryTrailsRepository = new InMemoryTrailsRepository();

    createTrailService = new CreateTrailService(inMemoryTrailsRepository);
  });

  it('should be able to create a trail', async () => {
    const trail = await createTrailService.execute({
      description: 'XX xxx xxx X XX xxx',
      name: 'Xxxxx',
      slug: 'xxxxx',
    });

    expect(trail.name).toBe('Xxxxx');
    expect(trail).toHaveProperty('description');
  });
});
