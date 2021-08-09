import { IPlatformUserRolesRepository } from '@modules/users/domain/repositories/IPlatformUserRolesRepository';
import { getRepository, Repository } from 'typeorm';
import { PlatformUserRoles } from '../entities/PlatformUserRoles';

export class PlatformUserRolesRepository implements IPlatformUserRolesRepository {
  private ormRepository: Repository<PlatformUserRoles>;

  constructor() {
    this.ormRepository = getRepository(PlatformUserRoles);
  }
  
  async addRoleToUser(user_id: string, role_id: string): Promise<PlatformUserRoles> {
    const addNewRoleUser = this.ormRepository.create({
      user_id,
      role_id
    });

    await this.ormRepository.save(addNewRoleUser);

    return addNewRoleUser;
  }

  async findByRoleId(role_id: string): Promise<PlatformUserRoles | undefined> {
    const findRole = await this.ormRepository.findOne({
      where: {
        role_id,
      }
    });

    return findRole;
  }

  async findByUserId(user_id: string): Promise<PlatformUserRoles  | undefined> {
    const findRole = await this.ormRepository.findOne({
      where: {
        user_id,
      }
    });

    return findRole;
  }

  async roleUserAdded(user_role_id: string): Promise<PlatformUserRoles | undefined> {
    const findRole = await this.ormRepository.findOne({
      where: {
        id: user_role_id,
      },
      relations: ['role']
    });

    return findRole;
  }
}