import { FakeUserRolesRepository } from '@modules/users/__tests__/fakes/FakeUserRolesRepository';
import { CreateRoleService } from '@modules/roles/services/CreateRoleService';
import { IUser } from '@modules/users/domain/entities/IUser';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeRolesRepository } from '../fakes/FakeRolesRepository';

let fakeRolesRepository: FakeRolesRepository;
let fakeUserRolesRepository: FakeUserRolesRepository;
let fakeUsersRepository: FakeUsersRepository;
let createRole: CreateRoleService;
let user: IUser;

describe('CreateRole', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();
    fakeUserRolesRepository = new FakeUserRolesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createRole = new CreateRoleService(
      fakeRolesRepository,
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

    const fakeRole = await fakeRolesRepository.create({
      permission: 0,
      name: 'admin',
    });

    const fakeUserRole = await fakeUserRolesRepository.addRoleToUser(
      user.id,
      fakeRole.id,
    );

    fakeUserRole.role = fakeRole;

    jest
      .spyOn(fakeUsersRepository, 'findById')
      .mockImplementationOnce(async () => ({
        ...user,
        user_roles: [fakeUserRole],
      }));
  });

  it('should be able to create a role', async () => {
    const role = await createRole.execute({
      permission: 1,
      role: 'sub-admin',
      user_id_logged: user.id,
    });

    expect(role.permission).toBe(1);
    expect(role.name).toBe('sub-admin');
  });

  it('should not be able to create an existing role', async () => {
    const role = await fakeRolesRepository.create({
      permission: 0,
      name: 'existing-role',
    });

    await expect(
      createRole.execute({
        permission: 1,
        role: role.name,
        user_id_logged: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an existing permission', async () => {
    const existingPermission = 2;

    await fakeRolesRepository.create({
      permission: existingPermission,
      name: 'sub-admin',
    });

    await expect(
      createRole.execute({
        user_id_logged: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a non-existing user', async () => {
    await createRole.execute({
      permission: 2,
      role: 'default',
      user_id_logged: user.id,
    });

    await expect(
      createRole.execute({
        permission: 1,
        role: 'sub-admin',
        user_id_logged: 'non-existent-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a greater or equal role to the creator user', async () => {
    await expect(
      createRole.execute({
        permission: -1,
        role: 'greater-role',
        user_id_logged: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
