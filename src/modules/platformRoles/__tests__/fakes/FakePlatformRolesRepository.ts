import { IPlatformRole } from '@modules/platformRoles/domain/entities/IPlatformRole';
import { IPlatformRolesRepository } from '@modules/platformRoles/domain/repositories/IPlatformRolesRepository';
import { ICreatePlatformRoleDTO } from '@modules/platformRoles/dtos/ICreatePlatformRoleDTO';
import { v4 as uuid } from 'uuid';
import { PlatformRole } from '../../infra/typeorm/entities/PlatformRole';

class FakePlatformRolesRepository implements IPlatformRolesRepository {
  private platformRoles: IPlatformRole[] = [];

  async create({
    permission,
    role,
  }: ICreatePlatformRoleDTO): Promise<IPlatformRole> {
    const platformUserRole = new PlatformRole();

    Object.assign(platformUserRole, {
      id: uuid(),
      permission,
      role,
    });

    this.platformRoles.push(platformUserRole);

    return platformUserRole;
  }

  async findByRoleName(role: string): Promise<IPlatformRole | undefined> {
    const platformRole = this.platformRoles.find(
      platformRoleFind => platformRoleFind.role === role,
    );

    return platformRole;
  }

  async findByRoleId(
    platform_role_id: string,
  ): Promise<IPlatformRole | undefined> {
    const platformRole = this.platformRoles.find(
      platformRoleFind => platformRoleFind.id === platform_role_id,
    );

    return platformRole;
  }

  async findByRolePermission(
    role_permission: number,
  ): Promise<IPlatformRole | undefined> {
    const platformRole = this.platformRoles.find(
      platformRoleFind => platformRoleFind.permission === role_permission,
    );

    return platformRole;
  }

  async listAllRoles(): Promise<IPlatformRole[]> {
    return this.platformRoles;
  }
}

export { FakePlatformRolesRepository };
