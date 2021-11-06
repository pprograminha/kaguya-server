import { IRole } from '@modules/roles/domain/entities/IRole';
import { IRolesRepository } from '@modules/roles/domain/repositories/IRolesRepository';
import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { v4 as uuid } from 'uuid';
import { Role } from '../../infra/typeorm/entities/Role';

class FakeRolesRepository implements IRolesRepository {
  private roles: IRole[] = [];

  async destroyById(role_id: string): Promise<void> {
    const roleIndex = this.roles.findIndex(role => role.id === role_id);

    if (roleIndex === -1) return;

    this.roles.splice(roleIndex, 1);
  }

  async create({ permission, name }: ICreateRoleDTO): Promise<IRole> {
    const userRole = new Role();

    Object.assign(userRole, {
      id: uuid(),
      permission,
      name,
    });

    this.roles.push(userRole);

    return userRole;
  }

  async findByRoleName(name: string): Promise<IRole | undefined> {
    const role = this.roles.find(roleFind => roleFind.name === name);

    return role;
  }

  async findById(role_id: string): Promise<IRole | undefined> {
    const role = this.roles.find(roleFind => roleFind.id === role_id);

    return role;
  }

  async findByPermission(role_permission: number): Promise<IRole | undefined> {
    const role = this.roles.find(
      roleFind => roleFind.permission === role_permission,
    );

    return role;
  }

  async listAllRoles(): Promise<IRole[]> {
    return this.roles;
  }
}

export { FakeRolesRepository };
