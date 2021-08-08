import { CreateUserService } from '@modules/users/services/CreateUserService';
import { FakeUsersRepository } from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository';
import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { AppError } from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create an user', async () => {
    const user = await createUser.execute({
      name: 'Xxxx Xxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxx',
    });

    expect(user.email).toBe('xxxx@xxxx.xxx');
  });

  it(`should not be able to create an user with another's email`, async () => {
    await createUser.execute({
      name: 'Xxxx Xxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxx',
    });

    await expect(
      createUser.execute({
        name: 'Xxxx Xxxx',
        email: 'xxxx@xxxx.xxx',
        password: 'xxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
