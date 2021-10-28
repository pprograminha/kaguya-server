import { inject, injectable } from 'tsyringe';
import { IRole } from '../domain/entities/IRole';
import { IRolesRepository } from '../domain/repositories/IRolesRepository';

@injectable()
export class ListAllRolesService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute(): Promise<IRole[]> {
    const allRoles = await this.rolesRepository.listAllRoles();

    return allRoles;
  }
}
