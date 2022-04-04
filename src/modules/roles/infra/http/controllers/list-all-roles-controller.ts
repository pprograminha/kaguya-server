import { ListAllRolesService } from '@modules/roles/services/list-all-roles-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllRolesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { skip, take, order } = request.query;

    const listAllRoles = container.resolve(ListAllRolesService);

    const allRoles = await listAllRoles.execute({
      skip: skip as number | undefined,
      take: take as number | undefined,
      order: order as 'asc' | 'desc',
    });

    return response.status(200).json(allRoles);
  }
}
