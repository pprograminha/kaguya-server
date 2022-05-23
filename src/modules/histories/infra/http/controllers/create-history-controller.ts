import { CreateHistoryService } from '@modules/histories/services/create-history-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateHistoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { lesson_id } = request.body;
    const user_id = request.user.id;

    const createHistoryService = container.resolve(CreateHistoryService);

    const histories = await createHistoryService.execute({
      lesson_id,
      user_id,
    });

    return response.status(201).json(histories);
  }
}
