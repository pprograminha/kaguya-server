import { PlatformRolesRepository } from '@modules/platformRoles/infra/typeorm/repositories/PlatformRolesRepository';
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { PlatformUserRolesRepository } from '../../typeorm/repositories/PlatformUserRolesRepository';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;

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

    const user = await createUser.execute({
      email,
      name,
      password,
    });

    return response.status(201).json({user});
  }
}

export { CreateUserController };
