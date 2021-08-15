import { CreateUserService } from '@modules/users/services/CreateUserService';
import { FakeUsersRepository } from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository';
import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { AppError } from '@shared/errors/AppError';
import { FakePlatformRolesRepository } from '@modules/platformRoles/infra/typeorm/repositories/fakes/FakePlatformRolesRepository';
import { FakePlatformUserRolesRepository } from '@modules/users/infra/typeorm/repositories/fakes/FakePlatformUserRolesRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakePlatformRolesRepository: FakePlatformRolesRepository;
let fakePlatformUserRolesRepository: FakePlatformUserRolesRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakePlatformRolesRepository = new FakePlatformRolesRepository();
    fakePlatformUserRolesRepository = new FakePlatformUserRolesRepository();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakePlatformRolesRepository,
      fakePlatformUserRolesRepository,
    );
  });

  it('should be able to create an user', async () => {
    await fakePlatformRolesRepository.create({
      permission: 3,
      role: 'default',
    });

    const user = await createUser.execute({
      name: 'Xxxx Xxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxx',
    });

    expect(user.email).toBe('xxxx@xxxx.xxx');
  });

  it('should be able to create an user by admin', async () => {
    await fakePlatformRolesRepository.create({
      permission: 0,
      role: 'admin',
    });

    await fakePlatformRolesRepository.create({
      permission: 3,
      role: 'default',
    });

    const admin = await createUser.execute({
      name: 'Xxxx Xxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxx',
      role_name: 'admin',
    });

    const user = await createUser.execute({
      name: 'Xxxx Xxxx',
      email: 'xxxxx@xxxx.xxx',
      password: 'xxxx',
      admin_id: admin.id,
    });

    expect(user.email).toBe('xxxxx@xxxx.xxx');
  });
  it('should not be able to create an user with non-existent administrator', async () => {
    await fakePlatformRolesRepository.create({
      permission: 3,
      role: 'default',
    });

    await expect(
      createUser.execute({
        name: 'Xxxx Xxxx',
        email: 'xxxxx@xxxx.xxx',
        password: 'xxxx',
        admin_id: 'non-existing-admin-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user with the same role or higher as the administrator', async () => {
    await fakePlatformRolesRepository.create({
      permission: 9999,
      role: 'xxxx',
    });

    const admin = await createUser.execute({
      name: 'Xxxx Xxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxx',
      role_name: 'xxxx',
    });

    await expect(
      createUser.execute({
        name: 'Xxxx Xxxx',
        email: 'xxxxx@xxxx.xxx',
        password: 'xxxx',
        role_name: 'xxxx',
        admin_id: admin.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user with non-existent role', async () => {
    await expect(
      createUser.execute({
        name: 'Xxxx Xxxx',
        email: 'xxxx@xxxx.xxx',
        password: 'xxxx',
        role_name: 'non-existing-role',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should not be able to create an user with another's email`, async () => {
    await fakePlatformRolesRepository.create({
      permission: 3,
      role: 'default',
    });

    await createUser.execute({
      name: 'Xxxx Xxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxx',
      role_name: 'default',
    });

    await expect(
      createUser.execute({
        name: 'Xxxx Xxxx',
        email: 'xxxx@xxxx.xxx',
        password: 'xxxx',
        role_name: 'default',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
