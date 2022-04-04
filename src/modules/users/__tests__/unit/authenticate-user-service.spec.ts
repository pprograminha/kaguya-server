import { InMemoryHashProvider } from '@modules/users/providers/hash-provider/in-memory/in-memory-hash-provider';
import { InMemoryTokenProvider } from '@modules/users/providers/token-provider/in-memory/in-memory-token-provider';
import { AuthenticateUserService } from '@modules/users/services/authenticate-user-service';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { AppError } from '@shared/errors/app-error';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryHashProvider: InMemoryHashProvider;
let inMemoryTokenProvider: InMemoryTokenProvider;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryHashProvider = new InMemoryHashProvider();
    inMemoryTokenProvider = new InMemoryTokenProvider();
    authenticateUser = new AuthenticateUserService(
      inMemoryUsersRepository,
      inMemoryHashProvider,
      inMemoryTokenProvider,
    );
  });

  it('should be able to authenticate a user', async () => {
    const user = await inMemoryUsersRepository.create({
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
    await inMemoryUsersRepository.create({
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
