import { RemoveUserService } from '@modules/users/services/remove-user-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class RemoveUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const removeUser = container.resolve(RemoveUserService);

    await removeUser.execute({
      user_id,
    });

    return response.status(204).json();
  }
}
