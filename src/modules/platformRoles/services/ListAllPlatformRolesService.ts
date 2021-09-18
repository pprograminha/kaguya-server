import { inject, injectable } from 'tsyringe';
import { IPlatformRole } from '../domain/entities/IPlatformRole';
import { IPlatformRolesRepository } from '../domain/repositories/IPlatformRolesRepository';

@injectable()
export class ListAllPlatformRolesService {
  constructor(
    @inject('PlatformRolesRepository')
    private platformRolesRepository: IPlatformRolesRepository,
  ) {}

  async execute(): Promise<IPlatformRole[]> {
    const allRoles = await this.platformRolesRepository.listAllRoles();

    return allRoles;
  }
}
