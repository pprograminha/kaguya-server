import { IPlatformUserRolesRepository } from '@modules/users/domain/repositories/IPlatformUserRolesRepository';
import { getRepository, Repository } from 'typeorm';
import { PlatformUserRole } from '../entities/PlatformUserRole';

export class PlatformUserRolesRepository
  implements IPlatformUserRolesRepository
{
  private ormRepository: Repository<PlatformUserRole>;

  constructor() {
    this.ormRepository = getRepository(PlatformUserRole);
  }

  async addRoleToUser(
    user_id: string,
    platform_role_id: string,
  ): Promise<PlatformUserRole> {
    const addNewRoleUser = this.ormRepository.create({
      user_id,
      platform_role_id,
    });

    await this.ormRepository.save(addNewRoleUser);

    return addNewRoleUser;
  }

  async findByRoleId(
    platform_role_id: string,
  ): Promise<PlatformUserRole | undefined> {
    const findRole = await this.ormRepository.findOne({
      where: {
        platform_role_id,
      },
    });

    return findRole;
  }

  async findByUserId(user_id: string): Promise<PlatformUserRole | undefined> {
    const findRole = await this.ormRepository.findOne({
      where: {
        user_id,
      },
    });

    return findRole;
  }
}
