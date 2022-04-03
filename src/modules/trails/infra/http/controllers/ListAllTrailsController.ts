import { ListAllTrailsService } from '@modules/trails/services/ListAllTrailsService';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllTrailsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { skip, take, order, exclude_my_trails, get_user_trail } =
      request.query;

    const user_id = request.user.id;

    const listAllTrails = container.resolve(ListAllTrailsService);

    const trails = await listAllTrails.execute({
      skip: skip as number | undefined,
      take: take as number | undefined,
      order: order as 'asc' | 'desc',
      user_id,
      get_user_trail: Boolean(get_user_trail),
      exclude_my_trails: Boolean(exclude_my_trails),
    });

    return response
      .status(200)
      .json(trails.map(trail => instanceToInstance('trail', trail)));
  }
}
