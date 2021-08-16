import { IPlatformRole } from '@modules/platformRoles/domain/entities/IPlatformRole';
import { FakePlatformRolesRepository } from '@modules/platformRoles/infra/typeorm/repositories/fakes/FakePlatformRolesRepository';
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

    const platformRoles: IPlatformRole[] = [];

    let lastestPlatformRole: IPlatformRole = {} as IPlatformRole;

    const promises = arrayOfNumbers.map(async number => {
      const platformRole = await fakePlatformRolesRepository.create({
        permission: number,
        role: `role-${number}`,
      });

      platformRoles.push(platformRole);
      lastestPlatformRole = platformRole;
    });

    const response = await listAllPlatformRoles.execute();

    expect(platformRoles).toEqual(
      expect.arrayContaining([lastestPlatformRole]),
    );
    expect(response.length).toEqual(5);

    await Promise.all(promises);
  });
});
