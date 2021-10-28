import { ListAllRolesService } from '@modules/roles/services/ListAllRolesService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllRolesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllRoles = container.resolve(ListAllRolesService);

    const allRoles = await listAllRoles.execute();

    return response.status(200).json(classToClass(allRoles));
  }
}
