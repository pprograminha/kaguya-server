import { v4 as uuid } from 'uuid';
import { IPlatformUserRole } from '@modules/users/domain/entities/IPlatformUserRole';
import { IPlatformUserRolesRepository } from '@modules/users/domain/repositories/IPlatformUserRolesRepository';
import { PlatformUserRole } from '../../infra/typeorm/entities/PlatformUserRole';

class FakePlatformUserRolesRepository implements IPlatformUserRolesRepository {
  private platformUserRoles: IPlatformUserRole[] = [];

  async findByUserId(user_id: string): Promise<IPlatformUserRole | undefined> {
    const platformUserRole = this.platformUserRoles.find(
      platformUserRoleFind => platformUserRoleFind.user_id === user_id,
    );

    return platformUserRole;
  }

  async findByRoleId(
    platform_role_id: string,
  ): Promise<IPlatformUserRole | undefined> {
    const platformUserRole = this.platformUserRoles.find(
      platformUserRoleFind =>
        platformUserRoleFind.platform_role_id === platform_role_id,
    );

    return platformUserRole;
  }

  async addRoleToUser(
    user_id: string,
    platform_role_id: string,
  ): Promise<IPlatformUserRole> {
    const platformUserRole = new PlatformUserRole();

    Object.assign(platformUserRole, {
      id: uuid(),
      user_id,
      platform_role_id,
    });

    this.platformUserRoles.push(platformUserRole);

    return platformUserRole;
  }
}

export { FakePlatformUserRolesRepository };
