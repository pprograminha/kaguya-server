import { FakeTrailsRepository } from '@modules/trails/infra/typeorm/repositories/fakes/FakeTrailsRepository';
import { ListAllTrailsService } from '@modules/trails/services/ListAllTrailsService';

let fakeTrailsRepository: FakeTrailsRepository;
let listAllTrails: ListAllTrailsService;

describe('ListAllTrails', () => {
  beforeEach(() => {
    fakeTrailsRepository = new FakeTrailsRepository();

    listAllTrails = new ListAllTrailsService(fakeTrailsRepository);
  });

  it('should be able to list all trails', async () => {
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxx Xxxx',
      name: 'Xxxx',
    });
    const trails = await listAllTrails.execute();

    expect(trails).toEqual(expect.arrayContaining([trail]));
  });
});
