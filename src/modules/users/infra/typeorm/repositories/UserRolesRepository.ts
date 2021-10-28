import { IUserRolesRepository } from '@modules/users/domain/repositories/IUserRolesRepository';
import { getRepository, Repository } from 'typeorm';
import { UserRole } from '../entities/UserRole';

export class UserRolesRepository implements IUserRolesRepository {
  private ormRepository: Repository<UserRole>;

  constructor() {
    this.ormRepository = getRepository(UserRole);
  }

  async addRoleToUser(user_id: string, role_id: string): Promise<UserRole> {
    const addNewRoleUser = this.ormRepository.create({
      user_id,
      role_id,
    });

    await this.ormRepository.save(addNewRoleUser);

    return addNewRoleUser;
  }

  async findByRoleId(role_id: string): Promise<UserRole | undefined> {
    const findRole = await this.ormRepository.findOne({
      where: {
        role_id,
      },
    });

    return findRole;
  }

  async findByUserId(user_id: string): Promise<UserRole | undefined> {
    const findRole = await this.ormRepository.findOne({
      where: {
        user_id,
      },
    });

    return findRole;
  }
}
