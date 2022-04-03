import { ListTheUsersAssociatedWithTheTrailService } from '@modules/users/services/list-the-users-associated-with-the-trail-service';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListTheUsersAssociatedWithTheTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { trail_id, order, skip, take } = request.query;

    const listTheUsersAssociatedWithTheTrail = container.resolve(
      ListTheUsersAssociatedWithTheTrailService,
    );

    const users = await listTheUsersAssociatedWithTheTrail.execute({
      trail_id: trail_id as string,
      order: order as 'asc' | 'desc' | undefined,
      skip: skip as number | undefined,
      take: take as number | undefined,
    });

    return response
      .status(200)
      .json(users.map(user => instanceToInstance('user', user)));
  }
}
