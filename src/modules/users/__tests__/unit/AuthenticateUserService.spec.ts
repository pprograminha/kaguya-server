import { FakeUsersRepository } from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository';
import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { FakeTokenProvider } from '@modules/users/providers/TokenProvider/fakes/FakeTokenProvider';
import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { AppError } from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeTokenProvider: FakeTokenProvider;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );
  });

  it('should be able to authenticate a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'xxxxx xxxxx',
      email: 'xxxxx@xxxxx.xxxxx',
      password: 'xxxxxxxx',
      username: 'xxxxx',
    });

    const response = await authenticateUser.execute({
      email: 'xxxxx@xxxxx.xxxxx',
      password: 'xxxxxxxx',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non-existent user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'xxxxx@xxxxx.xxxxx',
        password: 'xxxxxxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with an invalid user password', async () => {
    await fakeUsersRepository.create({
      name: 'xxxxx xxxxx',
      email: 'xxxxx@xxxxx.xxxxx',
      password: 'xxxxxxxx',
      username: 'xxxxx',
    });

    await expect(
      authenticateUser.execute({
        email: 'xxxxx@xxxxx.xxxxx',
        password: 'invalid-user-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
