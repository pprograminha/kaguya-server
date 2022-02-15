import { CreateRoleService } from '@modules/roles/services/CreateRoleService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id_logged = request.user.id;
    const { role, permission } = request.body;

    const createRole = container.resolve(CreateRoleService);

    const roleCreated = await createRole.execute({
      user_id_logged,
      permission,
      role,
    });

    return response.status(201).json(instanceToInstance(roleCreated));
  }
}
