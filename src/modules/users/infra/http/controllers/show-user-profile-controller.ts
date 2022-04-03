import { ShowUserProfileService } from '@modules/users/services/show-user-profile-service';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.query;
    const user_id = request.user.id;

    const showUserProfile = container.resolve(ShowUserProfileService);

    const user = await showUserProfile.execute({
      username: username as string,
      user_id,
    });

    return response.status(200).json(instanceToInstance('user', user));
  }
}
