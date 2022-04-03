import { ShowBlockService } from '@modules/blocks/services/show-block-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ShowBlockController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { block_id, block_slug, playlist_slug } = request.query;

    const showBlock = container.resolve(ShowBlockService);

    const block = await showBlock.execute({
      block_id: block_id as string,
      block_slug: block_slug as string,
      playlist_slug: playlist_slug as string,
    });

    return response.status(200).json(block);
  }
}

export { ShowBlockController };
