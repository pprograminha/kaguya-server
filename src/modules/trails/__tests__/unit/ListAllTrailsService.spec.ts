import { ListAllTrailsService } from '@modules/trails/services/ListAllTrailsService';
import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { FakeUserTrailsRepository } from '../fakes/FakeUserTrailsRepository';

let fakeTrailsRepository: FakeTrailsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTrailsRepository: FakeUserTrailsRepository;

let listAllTrails: ListAllTrailsService;

describe('ListAllTrails', () => {
  beforeEach(() => {
    fakeTrailsRepository = new FakeTrailsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTrailsRepository = new FakeUserTrailsRepository();

    listAllTrails = new ListAllTrailsService(
      fakeTrailsRepository,
      fakeUsersRepository,
      fakeUserTrailsRepository,
    );
  });

  it('should be able to list all trails', async () => {
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxx Xxxx',
      name: 'Xxxx',
    });

    const anotherTrail = await fakeTrailsRepository.create({
      description: 'Xxxx Xxxx',
      name: 'Xxxx',
    });

    const user = await fakeUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    const userTrail = await fakeUserTrailsRepository.create({
      trail_id: trail.id,
      user_id: user.id,
    });

    const anotherUserTrail = await fakeUserTrailsRepository.create({
      trail_id: anotherTrail.id,
      user_id: user.id,
    });

    const trailsCreated = [trail, anotherTrail];
    const userTrailsCreated = [userTrail, anotherUserTrail];

    jest
      .spyOn(fakeTrailsRepository, 'findAllTrails')
      .mockImplementationOnce(async () =>
        trailsCreated.map(trailMap => ({
          ...trailMap,
          user_trails: userTrailsCreated,
          playlists: [],
          _count: {
            playlists: 0,
            user_trails: userTrailsCreated.length,
          },
        })),
      );

    const trails = await listAllTrails.execute({
      user_id: user.id,
    });

    expect(trails.length).toEqual(trailsCreated.length);
  });
});
