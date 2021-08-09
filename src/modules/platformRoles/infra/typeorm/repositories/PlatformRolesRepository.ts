import { IPlatformRolesRepository } from '@modules/platformRoles/domain/repositories/IPlatformRolesRepository';
import { ICreatePlatformRoleDTO } from '@modules/platformRoles/dtos/ICreatePlatformRoleDTO';
import { getRepository, Repository } from 'typeorm';
import { PlatformRoles } from '../entities/PlatformRoles';

export class PlatformRolesRepository implements IPlatformRolesRepository {
  private ormRepository: Repository<PlatformRoles>;

  constructor() {
    this.ormRepository = getRepository(PlatformRoles);
  }

  async create(data: ICreatePlatformRoleDTO): Promise<PlatformRoles> {
    const role = this.ormRepository.create(data);

    await this.ormRepository.save(role);

    return role;
  };

  async findByRoleName(role_name: string): Promise<PlatformRoles | undefined> {
    const role = await this.ormRepository.findOne({
      where: {
        role: role_name
      }
    });

    return role;
  };

  async findByRolePermission(role_permission: number): Promise<PlatformRoles | undefined> {
    const role = await this.ormRepository.findOne({
      where: {
        permission: role_permission
      }
    });

    return role;
  };
}