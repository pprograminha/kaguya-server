import { ListHistoriesService } from '@modules/histories/services/list-histories-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListHistoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, order, skip, take } = request.query;

    const listHistoriesService = container.resolve(ListHistoriesService);

    const histories = await listHistoriesService.execute({
      user_id: user_id as string,
      order: order as 'asc' | 'desc',
      skip: skip as number | undefined,
      take: take as number | undefined,
    });

    return response.status(200).json(histories);
  }
}
