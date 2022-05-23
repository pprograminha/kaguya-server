import { CreateBlockService } from '@modules/blocks/services/create-block-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateBlockController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, slug, playlist_id } = request.body;

    const createBlock = container.resolve(CreateBlockService);

    const blockCreated = await createBlock.execute({
      name,
      slug,
      playlist_id,
    });

    return response.status(201).json(blockCreated);
  }
}

export { CreateBlockController };
