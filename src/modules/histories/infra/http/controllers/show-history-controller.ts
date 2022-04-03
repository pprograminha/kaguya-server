import { ShowHistoryService } from '@modules/histories/services/show-history-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowHistoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { history_id } = request.body;

    const user_id = request.user.id;

    const showHistoryService = container.resolve(ShowHistoryService);

    const history = await showHistoryService.execute({ user_id, history_id });

    return response.status(200).json(history);
  }
}
