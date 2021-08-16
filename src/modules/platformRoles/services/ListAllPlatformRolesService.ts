import { IPlatformRole } from '../domain/entities/IPlatformRole';
import { IPlatformRolesRepository } from '../domain/repositories/IPlatformRolesRepository';

export class ListAllPlatformRolesService {
  constructor(private platformRolesRepository: IPlatformRolesRepository) {}

  async execute(): Promise<IPlatformRole[]> {
    const allRoles = await this.platformRolesRepository.listAllRoles();

    return allRoles;
  }
}
