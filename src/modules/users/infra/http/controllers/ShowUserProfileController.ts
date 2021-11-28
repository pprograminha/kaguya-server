import { ShowUserProfileService } from '@modules/users/services/ShowUserProfileService';
import { classToClass } from 'class-transformer';
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

    return response.status(200).json(classToClass(user));
  }
}
