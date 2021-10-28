import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { ShowUserProfileService } from '@modules/users/services/ShowUserProfileService';
import { AppError } from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showUserProfile: ShowUserProfileService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUserProfile = new ShowUserProfileService(fakeUsersRepository);
  });

  it('display the user profile', async () => {
    const userCreated = await fakeUsersRepository.create({
      email: 'xxxxxx@xxxx.xxx',
      name: 'Xxxx Xxxx',
      password: 'xxxxxxx',
      username: 'custom-username',
    });

    const user = await showUserProfile.execute(userCreated.username);

    expect(user).toHaveProperty('id');
    expect(user.email).toBe(userCreated.email);
  });
  it('does not display the user profile because the user does not exist', async () => {
    await expect(showUserProfile.execute('non-existing-user')).rejects.toEqual(
      new AppError('This user does not exist', 403),
    );
  });
});
