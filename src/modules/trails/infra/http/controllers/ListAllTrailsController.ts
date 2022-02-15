import { ListAllTrailsService } from '@modules/trails/services/ListAllTrailsService';
import { instanceToInstance } from '@shared/helpers/instanceToInstance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllTrailsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { skip, take, order, exclude_my_trails } = request.query;

    const user_id = request.user.id;

    const listAllTrails = container.resolve(ListAllTrailsService);

    const trails = await listAllTrails.execute({
      skip: skip as number | undefined,
      take: take as number | undefined,
      order: order as 'asc' | 'desc',
      user_id,
      exclude_my_trails: Boolean(exclude_my_trails),
    });

    return response
      .status(200)
      .json(trails.map(trail => instanceToInstance('trail', trail)));
  }
}
