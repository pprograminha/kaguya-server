import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { ListAllUserTrailsFromUserService } from '@modules/trails/services/ListAllUserTrailsFromUserService';
import { FakeUserTrailsRepository } from '../fakes/FakeUserTrailsRepository';

let fakeUserTrailsRepository: FakeUserTrailsRepository;
let fakeUsersRepository: FakeUsersRepository;

let listAllUserTrailsFromUser: ListAllUserTrailsFromUserService;

describe('ListAllUserTrailsFromUser', () => {
  beforeEach(() => {
    fakeUserTrailsRepository = new FakeUserTrailsRepository();
    fakeUsersRepository = new FakeUsersRepository();

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

    const trail = await fakeUserTrailsRepository.create({
      trail_id: 'trail-id',
      user_id: user.id,
    });

    const trails = await listAllUserTrailsFromUser.execute(user.id);

    expect(trails).toEqual(expect.arrayContaining([trail]));
  });
});
