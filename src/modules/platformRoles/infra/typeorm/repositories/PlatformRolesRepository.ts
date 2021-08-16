import { IPlatformRolesRepository } from '@modules/platformRoles/domain/repositories/IPlatformRolesRepository';
import { ICreatePlatformRoleDTO } from '@modules/platformRoles/dtos/ICreatePlatformRoleDTO';
import { getRepository, Repository } from 'typeorm';
import { PlatformRole } from '../entities/PlatformRole';

export class PlatformRolesRepository implements IPlatformRolesRepository {
  private ormRepository: Repository<PlatformRole>;

  constructor() {
    this.ormRepository = getRepository(PlatformRole);
  }

  async create(data: ICreatePlatformRoleDTO): Promise<PlatformRole> {
    const role = this.ormRepository.create(data);

    await this.ormRepository.save(role);

    return role;
  }

  async findByRoleName(role_name: string): Promise<PlatformRole | undefined> {
    const role = await this.ormRepository.findOne({
      where: {
        role: role_name,
      },
    });

    return role;
  }

  async findByRolePermission(
    role_permission: number,
  ): Promise<PlatformRole | undefined> {
    const role = await this.ormRepository.findOne({
      where: {
        permission: role_permission,
      },
    });

    return role;
  }

  async findByRoleId(
    platform_role_id: string,
  ): Promise<PlatformRole | undefined> {
    const role = await this.ormRepository.findOne({
      where: {
        id: platform_role_id,
      },
    });

    return role;
  }

  async listAllRoles(): Promise<PlatformRole[]> {
    const allRoles = await this.ormRepository.find({
      order: {
        permission: 'ASC',
      },
    });

    return allRoles;
  }
}
