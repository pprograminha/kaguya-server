import { CreateRoleService } from '@modules/roles/services/create-role-service';
import { IUser } from '@modules/users/domain/entities/iuser';
import { InMemoryUserRolesRepository } from '@modules/users/__tests__/in-memory/in-memory-user-roles-repository';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { AppError } from '@shared/errors/app-error';
import { InMemoryRolesRepository } from '../in-memory/in-memory-roles-repository';

let inMemoryRolesRepository: InMemoryRolesRepository;
let inMemoryUserRolesRepository: InMemoryUserRolesRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createRole: CreateRoleService;
let user: IUser;

describe('CreateRole', () => {
  beforeEach(() => {
    inMemoryRolesRepository = new InMemoryRolesRepository();
    inMemoryUserRolesRepository = new InMemoryUserRolesRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();

    createRole = new CreateRoleService(
      inMemoryRolesRepository,
      inMemoryUsersRepository,
    );
  });
  beforeEach(async () => {
    user = await inMemoryUsersRepository.create({
      email: 'xxx@xxx.xxx',
      name: 'Xxxx Xxxxx',
      password: 'xxxxxxxxxx',
      username: 'xxxxxxxxxxx',
    });

    const role = await inMemoryRolesRepository.create({
      permission: 0,
      name: 'admin',
    });

    const userRole = await inMemoryUserRolesRepository.addRoleToUser(
      user.id,
      role.id,
    );

    userRole.role = role;

    jest
      .spyOn(inMemoryUsersRepository, 'findById')
      .mockImplementationOnce(async () => ({
        ...user,
        user_roles: [userRole],
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
    const role = await inMemoryRolesRepository.create({
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

    await inMemoryRolesRepository.create({
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
