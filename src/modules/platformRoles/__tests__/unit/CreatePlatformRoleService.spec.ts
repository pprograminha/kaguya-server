import { FakePlatformRolesRepository } from '@modules/platformRoles/infra/typeorm/repositories/fakes/FakePlatformRolesRepository';
import { CreatePlatformRoleService } from '@modules/platformRoles/services/CreatePlatformRoleService';
import { IUser } from '@modules/users/domain/entities/IUser';
import { FakePlatformUserRolesRepository } from '@modules/users/__tests__/fakes/FakePlatformUserRolesRepository';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';

let fakePlatformRolesRepository: FakePlatformRolesRepository;
let fakePlatformUserRolesRepository: FakePlatformUserRolesRepository;
let fakeUsersRepository: FakeUsersRepository;
let createPlatformRole: CreatePlatformRoleService;
let user: IUser;

describe('CreatePlatformRole', () => {
  beforeEach(() => {
    fakePlatformRolesRepository = new FakePlatformRolesRepository();
    fakePlatformUserRolesRepository = new FakePlatformUserRolesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createPlatformRole = new CreatePlatformRoleService(
      fakePlatformRolesRepository,
      fakeUsersRepository,
    );
  });
  beforeEach(async () => {
    user = await fakeUsersRepository.create({
      email: 'xxx@xxx.xxx',
      name: 'Xxxx Xxxxx',
      password: 'xxxxxxxxxx',
      username: 'xxxxxxxxxxx',
    });

    const fakePlatformRole = await fakePlatformRolesRepository.create({
      permission: 0,
      role: 'admin',
    });

    const fakePlatformUserRole =
      await fakePlatformUserRolesRepository.addRoleToUser(
        user.id,
        fakePlatformRole.id,
      );

    fakePlatformUserRole.platformRole = fakePlatformRole;

    jest
      .spyOn(fakeUsersRepository, 'findById')
      .mockImplementationOnce(async () => ({
        ...user,
        platformUserRoles: [fakePlatformUserRole],
      }));
  });

  it('should be able to create a role', async () => {
    const platformRole = await createPlatformRole.execute({
      permission: 1,
      role: 'sub-admin',
      user_id_logged: user.id,
    });

    expect(platformRole.permission).toBe(1);
    expect(platformRole.role).toBe('sub-admin');
  });

  it('should not be able to create an existing role', async () => {
    const platformRole = await fakePlatformRolesRepository.create({
      permission: 0,
      role: 'existing-role',
    });

    await expect(
      createPlatformRole.execute({
        permission: 1,
        role: platformRole.role,
        user_id_logged: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an existing permission', async () => {
    const existingPermission = 2;

    await fakePlatformRolesRepository.create({
      permission: existingPermission,
      role: 'sub-admin',
    });

    await expect(
      createPlatformRole.execute({
        user_id_logged: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a non-existing user', async () => {
    await createPlatformRole.execute({
      permission: 2,
      role: 'default',
      user_id_logged: user.id,
    });

    await expect(
      createPlatformRole.execute({
        permission: 1,
        role: 'sub-admin',
        user_id_logged: 'non-existent-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a greater or equal role to the creator user', async () => {
    await expect(
      createPlatformRole.execute({
        permission: -1,
        role: 'greater-role',
        user_id_logged: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
