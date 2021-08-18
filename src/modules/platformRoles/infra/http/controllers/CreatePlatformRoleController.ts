import { CreatePlatformRoleService } from '@modules/platformRoles/services/CreatePlatformRoleService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreatePlatformRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id_logged = request.user.id;
    const { role, permission } = request.body;

    const createPlatformRole = container.resolve(CreatePlatformRoleService);

    const platformRole = await createPlatformRole.execute({
      user_id_logged,
      permission,
      role,
    });

    return response.status(201).json(platformRole);
  }
}
