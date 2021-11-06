import { FakeRolesRepository } from '@modules/roles/__tests__/fakes/FakeRolesRepository';
import { IUserRole } from '@modules/users/domain/entities/IUserRole';
import { FakeUserRolesRepository } from '@modules/users/__tests__/fakes/FakeUserRolesRepository';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { AppError } from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeRolesRepository: FakeRolesRepository;
let fakeUserRolesRepository: FakeUserRolesRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeRolesRepository = new FakeRolesRepository();
    fakeUserRolesRepository = new FakeUserRolesRepository();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeRolesRepository,
      fakeUserRolesRepository,
    );
  });

  it('should be able to create an user', async () => {
    await fakeRolesRepository.create({
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
    const testUser = await fakeUsersRepository.create({
      name: 'Xxxx Xxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxx',
      username: 'xxxxxxx',
    });

    const role = await fakeRolesRepository.create({
      permission: 0,
      name: 'admin',
    });

    await fakeRolesRepository.create({
      permission: 2,
      name: 'default',
    });

    const userRole = await fakeUserRolesRepository.addRoleToUser(
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
      .spyOn(fakeUsersRepository, 'findById')
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
    await fakeRolesRepository.create({
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
    ).rejects.toEqual(new AppError('Creator does not exist', 401));
  });

  it('should not be able to create an user with the same role or higher as the administrator', async () => {
    const adminrole = await fakeRolesRepository.create({
      permission: 0,
      name: 'admin',
    });

    const admin = await createUser.execute({
      username: 'xxxxxxxx',
      email: 'xxxx@xxxx.xxx',
      password: 'xxxx',
      role: 'admin',
    });

    const adminUserRole = await fakeUserRolesRepository.addRoleToUser(
      admin.id,
      adminrole.id,
    );

    adminUserRole.role = adminrole;

    jest
      .spyOn(fakeUsersRepository, 'findById')
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
    ).rejects.toEqual(new AppError('Role does not exist', 403));
  });

  it(`should not be able to create an user with another's email`, async () => {
    await fakeRolesRepository.create({
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
    ).rejects.toEqual(new AppError('Unable to create user', 403));
  });

  it(`should not be able to create an user with another's username`, async () => {
    await fakeRolesRepository.create({
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
    ).rejects.toEqual(new AppError('Username entered already exists', 403));
  });
});
