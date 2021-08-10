import { ListAllUsersService } from '@modules/users/services/ListAllUsersService';
import { Request, Response } from 'express';
import { PlatformUserRolesRepository } from '../../typeorm/repositories/PlatformUserRolesRepository';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export class ListAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id_logged = request.user.id;
    const usersRepository = new UsersRepository();
    const platformUserRolesRepository = new PlatformUserRolesRepository();

    const listAllUsers = new ListAllUsersService(
      usersRepository,
      platformUserRolesRepository
    );

    const {users, usersCount} = await listAllUsers.execute({
      user_id_logged
    });

    return response.status(201).json({usersCount, users});
  }
}