import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';
import { inject, injectable } from '@shared/container';
import { IRole } from '../domain/entities/irole';
import { IRolesRepository } from '../domain/repositories/roles-repository';

@injectable()
export class ListAllRolesService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute(data?: FiltersDTO): Promise<IRole[]> {
    const allRoles = await this.rolesRepository.listAllRoles({
      skip: data?.skip,
      take: data?.take,
      order: data?.order,
    });

    return allRoles;
  }
}
