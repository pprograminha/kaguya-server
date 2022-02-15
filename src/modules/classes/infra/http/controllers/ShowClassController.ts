import { ShowClassService } from '@modules/classes/services/ShowClassService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowClassController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { class_id, block_id, name } = request.query;

    const showClass = container.resolve(ShowClassService);

    const _class = await showClass.execute({
      class_id: class_id as string,
      block_id: block_id as string,
      name: name as string,
    });

    return response.status(200).json(instanceToInstance(_class));
  }
}
