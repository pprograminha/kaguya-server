import { ITrail } from '@modules/trails/domain/entities/itrail';
import { ListAllUserTrailsFromUserService } from '@modules/trails/services/list-all-user-trails-from-user-service';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllUserTrailsFromUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, order, skip, take } = request.query;

    const listAllUserTrailsFromUser = container.resolve(
      ListAllUserTrailsFromUserService,
    );

    const user_logged_id = request.user.id;

    const trails = await listAllUserTrailsFromUser.execute({
      user_id: (user_id as string) || user_logged_id,
      order: order as 'asc' | 'desc',
      skip: skip as number | undefined,
      take: take as number | undefined,
    });

    return response
      .status(200)
      .json(
        trails.map(trail =>
          instanceToInstance('trail', trail as unknown as ITrail),
        ),
      );
  }
}
