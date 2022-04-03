import crypto from 'crypto';
import { IUserRole } from '@modules/users/domain/entities/iuser-role';
import { IUserRolesRepository } from '@modules/users/domain/repositories/iuser-roles-repository';
import { UserRole } from '@modules/users/entities/user-role';
import { AsyncMaybe } from '@shared/types/app';

class FakeUserRolesRepository implements IUserRolesRepository {
  private UserRoles: IUserRole[] = [];

  async findByUserId(user_id: string): AsyncMaybe<IUserRole> {
    const userRole = this.UserRoles.find(
      userRoleFind => userRoleFind.user_id === user_id,
    );

    return userRole;
  }

  async findByRoleId(role_id: string): AsyncMaybe<IUserRole> {
    const userRole = this.UserRoles.find(
      userRoleFind => userRoleFind.role_id === role_id,
    );

    return userRole;
  }

  async addRoleToUser(user_id: string, role_id: string): Promise<IUserRole> {
    const userRole = new UserRole();

    Object.assign(userRole, {
      id: crypto.randomUUID(),
      user_id,
      role_id,
    });

    this.UserRoles.push(userRole);

    return userRole;
  }
}

export { FakeUserRolesRepository };
