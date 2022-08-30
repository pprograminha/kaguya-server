import { UpdateUserService } from '@modules/users/services/update-user-service';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, name, password } = request.body;
    const user_id = request.user.id;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      username,
      name,
      password,
      user_id,
    });

    return response.status(200).json(instanceToInstance('user', user));
  }
}
