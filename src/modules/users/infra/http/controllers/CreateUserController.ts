import { PlatformRolesRepository } from '@modules/platformRoles/infra/typeorm/repositories/PlatformRolesRepository';
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { PlatformUserRolesRepository } from '../../typeorm/repositories/PlatformUserRolesRepository';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_logged_id = request.user.id;
    const { email, name, password, role_name } = request.body;

    const usersRepository = new UsersRepository();
    const bcryptHashProvider = new BCryptHashProvider();
    const platformRolesRepository = new PlatformRolesRepository();
    const platformUserRolesRepository = new PlatformUserRolesRepository();

    const createUser = new CreateUserService(
      usersRepository,
      bcryptHashProvider,
      platformRolesRepository,
      platformUserRolesRepository
    );

    const { user, userRole} = await createUser.execute({
      email,
      name,
      password,
      role_name,
      user_logged_id
    });

    return response.status(201).json({user, userRole});
  }
}

export { CreateUserController };
