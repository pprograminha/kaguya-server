import { ListAllUsersService } from '@modules/users/services/ListAllUsersService';
import { Request, Response } from 'express';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export class ListAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();

    const listAllUsers = new ListAllUsersService(usersRepository);

    const { users, usersCount } = await listAllUsers.execute();

    return response.status(201).json({ usersCount, users });
  }
}
