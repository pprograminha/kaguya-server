import { ShowBlockService } from '@modules/blocks/services/ShowBlockService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ShowBlockController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { block_id } = request.query;

    const showBlock = container.resolve(ShowBlockService);

    const block = await showBlock.execute(block_id as string);

    return response.status(200).json(block);
  }
}

export { ShowBlockController };
