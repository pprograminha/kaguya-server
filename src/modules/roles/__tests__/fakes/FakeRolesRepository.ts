import { IRole } from '@modules/roles/domain/entities/IRole';
import { IRolesRepository } from '@modules/roles/domain/repositories/IRolesRepository';
import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';
import { Role } from '../../entities/Role';

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
      id: crypto.randomUUID(),
      permission,
      name,
    });

    this.roles.push(userRole);

    return userRole;
  }

  async findByRoleName(name: string): AsyncMaybe<IRole> {
    const role = this.roles.find(roleFind => roleFind.name === name);

    return role;
  }

  async findById(role_id: string): AsyncMaybe<IRole> {
    const role = this.roles.find(roleFind => roleFind.id === role_id);

    return role;
  }

  async findByPermission(role_permission: number): AsyncMaybe<IRole> {
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
