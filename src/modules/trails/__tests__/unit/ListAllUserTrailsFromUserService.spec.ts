import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { ListAllUserTrailsFromUserService } from '@modules/trails/services/ListAllUserTrailsFromUserService';
import { FakeUserTrailsRepository } from '../fakes/FakeUserTrailsRepository';
import { FakeTrailsRepository } from '../fakes/FakeTrailsRepository';

let fakeUserTrailsRepository: FakeUserTrailsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeTrailsRepository: FakeTrailsRepository;

let listAllUserTrailsFromUser: ListAllUserTrailsFromUserService;

describe('ListAllUserTrailsFromUser', () => {
  beforeEach(() => {
    fakeUserTrailsRepository = new FakeUserTrailsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeTrailsRepository = new FakeTrailsRepository();

    listAllUserTrailsFromUser = new ListAllUserTrailsFromUserService(
      fakeUserTrailsRepository,
    );
  });

  it('should be able to list all user trails', async () => {
    const user = await fakeUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    const trail = await fakeTrailsRepository.create({
      description: 'xxxxxx',
      name: 'xxxxxx',
    });

    const userTrail = await fakeUserTrailsRepository.create({
      trail_id: trail.id,
      user_id: user.id,
    });

    jest
      .spyOn(fakeUserTrailsRepository, 'findAllUserTrails')
      .mockImplementationOnce(async () => [{ ...userTrail, user, trail }]);

    const trails = await listAllUserTrailsFromUser.execute({
      user: true,
      user_id: user.id,
    });

    expect(trails[0].id).toEqual(trail.id);
    expect(trails.length > 0).toBe(true);
  });
});
