import { ListAllTrailsService } from '@modules/trails/services/list-all-trails-service';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { InMemoryTrailsRepository } from '../in-memory/in-memory-trails-repository';
import { InMemoryUserTrailsRepository } from '../in-memory/in-memory-user-trails-repository';

let inMemoryTrailsRepository: InMemoryTrailsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserTrailsRepository: InMemoryUserTrailsRepository;

let listAllTrails: ListAllTrailsService;

describe('ListAllTrails', () => {
  beforeEach(() => {
    inMemoryTrailsRepository = new InMemoryTrailsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUserTrailsRepository = new InMemoryUserTrailsRepository();

    listAllTrails = new ListAllTrailsService(
      inMemoryTrailsRepository,
      inMemoryUsersRepository,
    );
  });

  it('should be able to list all trails', async () => {
    const trail = await inMemoryTrailsRepository.create({
      description: 'Xxxx Xxxx',
      name: 'Xxxx',
    });

    const anotherTrail = await inMemoryTrailsRepository.create({
      description: 'Xxxx Xxxx',
      name: 'Xxxx',
    });

    const user = await inMemoryUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    const userTrail = await inMemoryUserTrailsRepository.create({
      trail_id: trail.id,
      user_id: user.id,
    });

    const anotherUserTrail = await inMemoryUserTrailsRepository.create({
      trail_id: anotherTrail.id,
      user_id: user.id,
    });

    const trailsCreated = [trail, anotherTrail];
    const userTrailsCreated = [userTrail, anotherUserTrail];

    jest
      .spyOn(inMemoryTrailsRepository, 'findAllTrails')
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
