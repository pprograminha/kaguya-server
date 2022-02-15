import { ListClassesService } from '@modules/classes/services/ListClassesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListClassesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { block_id } = request.query;

    const user_id = request.user.id;

    const listClasses = container.resolve(ListClassesService);

    const classes = await listClasses.execute({
      user_id,
      block_id: block_id as string,
    });

    return response.status(200).json(classes);
  }
}
