import { ListAllUserTrailsFromUserService } from '@modules/trails/services/ListAllUserTrailsFromUserService';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllUserTrailsFromUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, user } = request.query;
    const listAllUserTrailsFromUser = container.resolve(
      ListAllUserTrailsFromUserService,
    );
    const user_logged_id = request.user.id;

    const trails = await listAllUserTrailsFromUser.execute({
      user_id: (user_id as string) || user_logged_id,
      user: Boolean(user),
    });

    return response
      .status(200)
      .json(trails.map(trail => instanceToInstance('trail', trail)));
  }
}
