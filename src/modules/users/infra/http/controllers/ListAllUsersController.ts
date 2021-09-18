import { ListAllUsersService } from '@modules/users/services/ListAllUsersService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllUsers = container.resolve(ListAllUsersService);

    const { users, usersCount } = await listAllUsers.execute();

    return response
      .status(200)
      .json({ usersCount, users: classToClass(users) });
  }
}
