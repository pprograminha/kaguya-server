import { FakePlatformRolesRepository } from '@modules/platformRoles/infra/typeorm/repositories/fakes/FakePlatformRolesRepository';
import { IPlatformUserRole } from '@modules/users/domain/entities/IPlatformUserRole';
import { FakePlatformUserRolesRepository } from '@modules/users/__tests__/fakes/FakePlatformUserRolesRepository';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { AppError } from '@shared/errors/AppError';

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
    const testUser = await fakeUsersRepository.create({
      name: 'Xxxx Xxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxx',
      username: 'xxxxxxx',
    });

    const platformRole = await fakePlatformRolesRepository.create({
      permission: 0,
      role: 'admin',
    });

    await fakePlatformRolesRepository.create({
      permission: 2,
      role: 'default',
    });

    const platformUserRole =
      await fakePlatformUserRolesRepository.addRoleToUser(
        testUser.id,
        platformRole.id,
      );

    const creator = await createUser.execute({
      name: 'Xxxx Xxxx',
      email: 'xxxxxx@xxxx.xxx',
      password: 'xxxx',
      role: 'admin',
    });

    const platformUserRoleFormatted = {
      ...platformUserRole,
      platformRole,
    } as IPlatformUserRole;

    jest
      .spyOn(fakeUsersRepository, 'findById')
      .mockImplementationOnce(async () => ({
        ...testUser,
        platformUserRoles: [platformUserRoleFormatted],
      }));

    const user = await createUser.execute({
      name: 'Xxxx Xxxx',
      email: 'xxxxx@xxxx.xxx',
      password: 'xxxx',
      role: 'default',
      creator_id: creator.id,
    });

    expect(user.email).toBe('xxxxx@xxxx.xxx');
  });
  it('should not be able to create an user with non-existent creator', async () => {
    await fakePlatformRolesRepository.create({
      permission: 3,
      role: 'default',
    });

    await expect(
      createUser.execute({
        name: 'Xxxx Xxxx',
        email: 'xxxxx@xxxx.xxx',
        password: 'xxxx',
        creator_id: 'non-existing-creator-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user with the same role or higher as the administrator', async () => {
    const adminPlatformRole = await fakePlatformRolesRepository.create({
      permission: 0,
      role: 'admin',
    });

    const admin = await createUser.execute({
      name: 'Xxxx Xxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxx',
      role: 'admin',
    });

    const adminPlatformUserRole =
      await fakePlatformUserRolesRepository.addRoleToUser(
        admin.id,
        adminPlatformRole.id,
      );

    adminPlatformUserRole.platformRole = adminPlatformRole;

    jest
      .spyOn(fakeUsersRepository, 'findById')
      .mockImplementationOnce(async () => ({
        ...admin,
        platformUserRoles: [adminPlatformUserRole],
      }));

    await expect(
      createUser.execute({
        name: 'Xxxx Xxxx',
        email: 'xxxxx@xxxx.xxx',
        password: 'xxxx',
        role: 'admin',
        creator_id: admin.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user with non-existent role', async () => {
    await expect(
      createUser.execute({
        name: 'Xxxx Xxxx',
        email: 'xxxx@xxxx.xxx',
        password: 'xxxx',
        role: 'non-existing-role',
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
      role: 'default',
    });

    await expect(
      createUser.execute({
        name: 'Xxxx Xxxx',
        email: 'xxxx@xxxx.xxx',
        password: 'xxxx',
        role: 'default',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
