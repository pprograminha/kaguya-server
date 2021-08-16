import { FakePlatformRolesRepository } from '@modules/platformRoles/infra/typeorm/repositories/fakes/FakePlatformRolesRepository';
import { CreatePlatformRoleService } from '@modules/platformRoles/services/CreatePlatformRoleService';
import { FakePlatformUserRolesRepository } from '@modules/users/infra/typeorm/repositories/fakes/FakePlatformUserRolesRepository';
import { FakeUsersRepository } from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository';

let fakePlatformRolesRepository: FakePlatformRolesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakePlatformUserRolesRepository: FakePlatformUserRolesRepository;
let createPlatformRole: CreatePlatformRoleService;

describe('CreatePlatformRole', () => {
  beforeEach(() => {
    fakePlatformRolesRepository = new FakePlatformRolesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakePlatformUserRolesRepository = new FakePlatformUserRolesRepository();

    createPlatformRole = new CreatePlatformRoleService(
      fakePlatformRolesRepository,
      fakeUsersRepository,
      fakePlatformUserRolesRepository,
    );
  });

  it('should be able to create a role', async () => {
    const user = await fakeUsersRepository.create({
      email: 'xxx@xxx.xxx',
      name: 'Xxxx Xxxxx',
      password: 'xxxxxxxxxx',
      username: 'xxxxxxxxxxx',
    });

    const platformRole = await createPlatformRole.execute({
      permission: 0,
      role: 'admin',
      user_id_logged: user.id,
    });

    expect(platformRole.permission).toBe(0);
    expect(platformRole.role).toBe('admin');
  });
});
