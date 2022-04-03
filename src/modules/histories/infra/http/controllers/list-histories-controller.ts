import { ListHistoriesService } from '@modules/histories/services/list-histories-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListHistoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;

    const listHistoriesService = container.resolve(ListHistoriesService);

    const histories = await listHistoriesService.execute(user_id);

    return response.status(200).json(histories);
  }
}
