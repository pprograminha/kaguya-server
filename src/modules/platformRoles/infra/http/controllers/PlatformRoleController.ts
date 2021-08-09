import { CreatePlatformRoleService } from '@modules/platformRoles/services/CreatePlatformRoleService';
import { PlatformUserRolesRepository } from '@modules/users/infra/typeorm/repositories/PlatformUserRolesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { Request, Response } from 'express';
import { PlatformRolesRepository } from '../../typeorm/repositories/PlatformRolesRepository';

export class PlatformRoleController {
  async create(request: Request, response: Response): Promise<Response> {
    const user_id_logged = request.user.id;
    const {role, permission} = request.body;

    const usersRepository = new UsersRepository();
    const platformRolesRepository = new PlatformRolesRepository();
    const platformUserRolesRepository = new PlatformUserRolesRepository();

    const createPlatformRole = new CreatePlatformRoleService(
      platformRolesRepository,
      usersRepository,
      platformUserRolesRepository
    );

    const platformRole = await createPlatformRole.execute({
      user_id_logged,
      permission,
      role
    });

    return response.json(platformRole);
  }
}