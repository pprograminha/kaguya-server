import { IRole } from '@modules/roles/domain/entities/irole';

import { ListAllRolesService } from '@modules/roles/services/list-all-roles-service';
import { InMemoryRolesRepository } from '../in-memory/in-memory-roles-repository';

let inMemoryRolesRepository: InMemoryRolesRepository;

let listAllRoles: ListAllRolesService;

describe('ListAllRole', () => {
  beforeEach(() => {
    inMemoryRolesRepository = new InMemoryRolesRepository();
    listAllRoles = new ListAllRolesService(inMemoryRolesRepository);
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
      const role = await inMemoryRolesRepository.create({
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
