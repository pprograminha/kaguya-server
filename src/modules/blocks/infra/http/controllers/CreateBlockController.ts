import { CreateBlockService } from '@modules/blocks/services/CreateBlockService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateBlockController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, playlist_id } = request.body;

    const createBlock = container.resolve(CreateBlockService);

    const blockCreated = await createBlock.execute({
      name,
      playlist_id,
    });

    return response.status(201).json(classToClass(blockCreated));
  }
}

export { CreateBlockController };
