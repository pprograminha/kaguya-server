import { InMemoryHashProvider } from '@modules/users/providers/HashProvider/in-memory/in-memory-hash-provider';
import { InMemoryTokenProvider } from '@modules/users/providers/TokenProvider/in-memory/in-memory-token-provider';
import { AuthenticateUserService } from '@modules/users/services/authenticate-user-service';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let inMemoryHashProvider: InMemoryHashProvider;
let inMemoryTokenProvider: InMemoryTokenProvider;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    inMemoryHashProvider = new InMemoryHashProvider();
    inMemoryTokenProvider = new InMemoryTokenProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      inMemoryHashProvider,
      inMemoryTokenProvider,
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
