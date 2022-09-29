import { DisableUserService } from '@modules/users/services/disable-user-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class DisableUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const disableUser = container.resolve(DisableUserService);

    await disableUser.execute({
      user_id,
    });

    return response.status(204).json();
  }
}
