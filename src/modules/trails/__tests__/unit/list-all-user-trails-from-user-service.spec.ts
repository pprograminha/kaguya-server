import { ListAllUserTrailsFromUserService } from '@modules/trails/services/list-all-user-trails-from-user-service';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { InMemoryTrailsRepository } from '../in-memory/in-memory-trails-repository';
import { InMemoryUserTrailsRepository } from '../in-memory/in-memory-user-trails-repository';

let inMemoryUserTrailsRepository: InMemoryUserTrailsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryTrailsRepository: InMemoryTrailsRepository;

let listAllUserTrailsFromUser: ListAllUserTrailsFromUserService;

describe('ListAllUserTrailsFromUser', () => {
  beforeEach(() => {
    inMemoryUserTrailsRepository = new InMemoryUserTrailsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryTrailsRepository = new InMemoryTrailsRepository();

    listAllUserTrailsFromUser = new ListAllUserTrailsFromUserService(
      inMemoryUserTrailsRepository,
    );
  });

  it('should be able to list all user trails', async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    const trail = await inMemoryTrailsRepository.create({
      description: 'xxxxxx',
      name: 'xxxxxx',
    });

    const userTrail = await inMemoryUserTrailsRepository.create({
      trail_id: trail.id,
      user_id: user.id,
    });

    jest
      .spyOn(inMemoryUserTrailsRepository, 'findAllUserTrails')
      .mockImplementationOnce(async () => [
        {
          ...userTrail,
          user,
          trail: {
            ...trail,
            _count: {
              user_trails: 0,
            },
            playlists: [],
          },
        },
      ]);

    const trails = await listAllUserTrailsFromUser.execute({
      user_id: user.id,
      enabled: true,
    });

    expect(trails[0].id).toEqual(trail.id);
    expect(trails.length > 0).toBe(true);
  });
});
