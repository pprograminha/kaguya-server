import { IRolesRepository } from '@modules/roles/domain/repositories/IRolesRepository';
import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { getRepository, Repository } from 'typeorm';
import { Role } from '../entities/Role';

export class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  async create(data: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create(data);

    await this.ormRepository.save(role);

    return role;
  }

  async findByRoleName(role: string): Promise<Role | undefined> {
    const roleFinded = await this.ormRepository.findOne({
      where: {
        name: role,
      },
    });

    return roleFinded;
  }

  async findByRolePermission(permission: number): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({
      where: {
        permission,
      },
    });

    return role;
  }

  async findByRoleId(role_id: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({
      where: {
        id: role_id,
      },
    });

    return role;
  }

  async listAllRoles(): Promise<Role[]> {
    const allRoles = await this.ormRepository.find({
      order: {
        permission: 'ASC',
      },
    });

    return allRoles;
  }
}
