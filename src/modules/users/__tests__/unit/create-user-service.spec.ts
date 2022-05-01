import { InMemoryRolesRepository } from '@modules/roles/__tests__/in-memory/in-memory-roles-repository';
import { IUserRole } from '@modules/users/domain/entities/iuser-role';
import { InMemoryHashProvider } from '@modules/users/providers/hash-provider/in-memory/in-memory-hash-provider';
import { CreateUserService } from '@modules/users/services/create-user-service';

import { AppError } from '@shared/errors/app-error';
import { InMemoryUserRolesRepository } from '../in-memory/in-memory-user-roles-repository';
import { InMemoryUsersRepository } from '../in-memory/in-memory-users-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryHashProvider: InMemoryHashProvider;
let inMemoryRolesRepository: InMemoryRolesRepository;
let inMemoryUserRolesRepository: InMemoryUserRolesRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryHashProvider = new InMemoryHashProvider();
    inMemoryRolesRepository = new InMemoryRolesRepository();
    inMemoryUserRolesRepository = new InMemoryUserRolesRepository();

    createUser = new CreateUserService(
      inMemoryUsersRepository,
      inMemoryHashProvider,
      inMemoryRolesRepository,
      inMemoryUserRolesRepository,
    );
  });

  it('should be able to create an user', async () => {
    await inMemoryRolesRepository.create({
      permission: 3,
      name: 'default',
    });

    const user = await createUser.execute({
      username: 'xxxxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxx',
    });

    expect(user.email).toBe('xxxx@xxxx.xxx');
  });

  it('should be able to create an user by admin', async () => {
    const testUser = await inMemoryUsersRepository.create({
      name: 'Xxxx Xxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxx',
      username: 'xxxxxxx',
    });

    const role = await inMemoryRolesRepository.create({
      permission: 0,
      name: 'admin',
    });

    await inMemoryRolesRepository.create({
      permission: 2,
      name: 'default',
    });

    const userRole = await inMemoryUserRolesRepository.addRoleToUser(
      testUser.id,
      role.id,
    );

    const creator = await createUser.execute({
      username: 'xxxxxxxx',
      email: 'xxxxxx@xxxx.xxx',
      password: 'xxxx',
      role: 'admin',
    });

    const userRoleFormatted = {
      ...userRole,
      role,
    } as IUserRole;

    jest
      .spyOn(inMemoryUsersRepository, 'findById')
      .mockImplementationOnce(async () => ({
        ...testUser,
        user_roles: [userRoleFormatted],
      }));

    const user = await createUser.execute({
      username: 'xxxxxxxxx',
      email: 'xxxxx@xxxx.xxx',
      password: 'xxxx',
      role: 'default',
      creator_id: creator.id,
    });

    expect(user.email).toBe('xxxxx@xxxx.xxx');
  });
  it('should not be able to create an user with non-existent creator', async () => {
    await inMemoryRolesRepository.create({
      permission: 3,
      name: 'default',
    });

    await expect(
      createUser.execute({
        username: 'xxxxxxx',
        email: 'xxxxx@xxxx.xxx',
        password: 'xxxx',
        creator_id: 'non-existing-creator-id',
      }),
    ).rejects.toEqual(new AppError('Creator does not exist', 5, 401));
  });

  it('should not be able to create an user with the same role or higher as the administrator', async () => {
    const adminrole = await inMemoryRolesRepository.create({
      permission: 0,
      name: 'admin',
    });

    const admin = await createUser.execute({
      username: 'xxxxxxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxx',
      role: 'admin',
    });

    const adminUserRole = await inMemoryUserRolesRepository.addRoleToUser(
      admin.id,
      adminrole.id,
    );

    adminUserRole.role = adminrole;

    jest
      .spyOn(inMemoryUsersRepository, 'findById')
      .mockImplementationOnce(async () => ({
        ...admin,
        user_roles: [adminUserRole],
      }));

    await expect(
      createUser.execute({
        username: 'xxxxxxxxx',
        email: 'xxxxx@xxxx.xxx',
        password: 'xxxx',
        role: 'admin',
        creator_id: admin.id,
      }),
    ).rejects.toEqual(
      new AppError(
        'You cannot give one permission greater or equal to yours',
        116,
        403,
      ),
    );
  });

  it('should not be able to create an user with non-existent role', async () => {
    await expect(
      createUser.execute({
        username: 'xxxxxxx',
        email: 'xxxx@xxxx.xxx',
        password: 'xxxx',
        role: 'non-existing-role',
      }),
    ).rejects.toEqual(new AppError('Role does not exist', 12, 400));
  });

  it(`should not be able to create an user with another's email`, async () => {
    await inMemoryRolesRepository.create({
      permission: 3,
      name: 'default',
    });

    await createUser.execute({
      username: 'xxxxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxx',
      role: 'default',
    });

    await expect(
      createUser.execute({
        username: 'xxxxxxxxxx',
        email: 'xxxx@xxxx.xxx',
        password: 'xxxx',
        role: 'default',
      }),
    ).rejects.toEqual(new AppError('Unable to create user', 23, 400));
  });

  it(`should not be able to create an user with another's username`, async () => {
    await inMemoryRolesRepository.create({
      permission: 3,
      name: 'default',
    });

    await createUser.execute({
      username: 'custom-username',
      email: 'xxxx@xxxxx.xxx',
      password: 'xxxxx',
      role: 'default',
    });

    await expect(
      createUser.execute({
        username: 'custom-username',
        email: 'xxxx@xxxx.xxx',
        password: 'xxxx',
        role: 'default',
      }),
    ).rejects.toEqual(new AppError('Username entered already exists', 24, 400));
  });
});
