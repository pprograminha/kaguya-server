import { ShowBlockService } from '@modules/blocks/services/show-block-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ShowBlockController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { block_id, name, playlist_id } = request.query;

    const showBlock = container.resolve(ShowBlockService);

    const block = await showBlock.execute({
      block_id: block_id as string,
      name: name as string,
      playlist_id: playlist_id as string,
    });

    return response.status(200).json(block);
  }
}

export { ShowBlockController };
