import { ListClassesService } from '@modules/classes/services/list-classes-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListClassesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { block_id, order, skip, take } = request.query;

    const user_id = request.user.id;

    const listClasses = container.resolve(ListClassesService);

    const classes = await listClasses.execute({
      user_id,
      block_id: block_id as string,
      order: order as 'desc' | 'asc',
      skip: skip as number | undefined,
      take: take as number | undefined,
    });

    return response.status(200).json(classes);
  }
}
