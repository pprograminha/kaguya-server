import { IPlatformRole } from '@modules/platformRoles/domain/entities/IPlatformRole';
import { FakePlatformRolesRepository } from '@modules/platformRoles/__tests__/fakes/FakePlatformRolesRepository';
import { ListAllPlatformRolesService } from '@modules/platformRoles/services/ListAllPlatformRolesService';

let fakePlatformRolesRepository: FakePlatformRolesRepository;

let listAllPlatformRoles: ListAllPlatformRolesService;

describe('ListAllPlatformRole', () => {
  beforeEach(() => {
    fakePlatformRolesRepository = new FakePlatformRolesRepository();
    listAllPlatformRoles = new ListAllPlatformRolesService(
      fakePlatformRolesRepository,
    );
  });

  it('should be able to list all platform roles', async () => {
    const arrayOfNumbers = Array.from(
      {
        length: 5,
      },
      (value, key) => key,
    );

    const platformRolesCreated: IPlatformRole[] = [];

    let lastestPlatformRole: IPlatformRole = {} as IPlatformRole;

    const promises = arrayOfNumbers.map(async number => {
      const platformRole = await fakePlatformRolesRepository.create({
        permission: number,
        role: `role-${number}`,
      });

      platformRolesCreated.push(platformRole);
      lastestPlatformRole = platformRole;
    });

    await Promise.all(promises);

    const platformRoles = await listAllPlatformRoles.execute();

    expect(platformRoles).toEqual(
      expect.arrayContaining([lastestPlatformRole]),
    );
    expect(platformRoles).toEqual(platformRolesCreated);
    expect(platformRoles.length).toEqual(5);
  });
});
