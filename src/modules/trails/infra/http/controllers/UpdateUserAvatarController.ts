import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService';
import { instanceToInstance } from '@shared/helpers/instanceToInstance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const avatar = request.file?.filename;

    const user_id = request.user.id;

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      avatar,
      user_id,
    });

    return response.status(200).json(instanceToInstance('user', user));
  }
}
