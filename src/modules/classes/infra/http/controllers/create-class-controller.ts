import { CreateClassService } from '@modules/classes/services/create-class-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateClassController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { block_id, description, link, name } = request.body;

    const createClass = container.resolve(CreateClassService);

    const classCreated = await createClass.execute({
      block_id,
      description,
      link,
      name,
    });

    return response.status(201).json(classCreated);
  }
}
