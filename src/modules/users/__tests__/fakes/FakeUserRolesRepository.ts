import { v4 as uuid } from 'uuid';
import { IUserRole } from '@modules/users/domain/entities/IUserRole';
import { IUserRolesRepository } from '@modules/users/domain/repositories/IUserRolesRepository';
import { UserRole } from '@modules/users/entities/UserRole';

class FakeUserRolesRepository implements IUserRolesRepository {
  private UserRoles: IUserRole[] = [];

  async findByUserId(user_id: string): Promise<IUserRole | undefined> {
    const userRole = this.UserRoles.find(
      userRoleFind => userRoleFind.user_id === user_id,
    );

    return userRole;
  }

  async findByRoleId(role_id: string): Promise<IUserRole | undefined> {
    const userRole = this.UserRoles.find(
      userRoleFind => userRoleFind.role_id === role_id,
    );

    return userRole;
  }

  async addRoleToUser(user_id: string, role_id: string): Promise<IUserRole> {
    const userRole = new UserRole();

    Object.assign(userRole, {
      id: uuid(),
      user_id,
      role_id,
    });

    this.UserRoles.push(userRole);

    return userRole;
  }
}

export { FakeUserRolesRepository };
