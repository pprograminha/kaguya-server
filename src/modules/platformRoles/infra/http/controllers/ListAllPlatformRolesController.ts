import { ListAllPlatformRolesService } from '@modules/platformRoles/services/ListAllPlatformRolesService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllPlatformRolesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllPlatformRoles = container.resolve(ListAllPlatformRolesService);

    const allRoles = await listAllPlatformRoles.execute();

    return response.status(200).json(classToClass(allRoles));
  }
}
