import { IRole } from '@modules/roles/domain/entities/IRole';
import { FakeRolesRepository } from '@modules/roles/__tests__/fakes/FakeRolesRepository';
import { ListAllRolesService } from '@modules/roles/services/ListAllRolesService';

let fakeRolesRepository: FakeRolesRepository;

let listAllRoles: ListAllRolesService;

describe('ListAllRole', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();
    listAllRoles = new ListAllRolesService(fakeRolesRepository);
  });

  it('should be able to list all roles', async () => {
    const arrayOfNumbers = Array.from(
      {
        length: 5,
      },
      (value, key) => key,
    );

    const rolesCreated: IRole[] = [];

    let lastestRole: IRole = {} as IRole;

    const promises = arrayOfNumbers.map(async number => {
      const role = await fakeRolesRepository.create({
        permission: number,
        name: `role-${number}`,
      });

      rolesCreated.push(role);
      lastestRole = role;
    });

    await Promise.all(promises);

    const roles = await listAllRoles.execute();

    expect(roles).toEqual(expect.arrayContaining([lastestRole]));
    expect(roles).toEqual(rolesCreated);
    expect(roles.length).toEqual(5);
  });
});
