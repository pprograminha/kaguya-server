import { ListAllUsersService } from '@modules/users/services/ListAllUsersService';
import { classToClass } from '@shared/helpers/classToClass';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { order, skip, take } = request.query;
    const listAllUsers = container.resolve(ListAllUsersService);

    const users = await listAllUsers.execute({
      order: order as 'asc' | 'desc',
      ...(skip ? { skip: Number(skip) } : {}),
      ...(take ? { take: Number(take) } : {}),
    });

    return response
      .status(200)
      .json(users.map(user => classToClass('user', user)));
  }
}
