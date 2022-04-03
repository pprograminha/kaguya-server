import { DeleteBlockService } from '@modules/blocks/services/delete-block-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DeleteBlockController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { block_id } = request.query;

    const deleteBlock = container.resolve(DeleteBlockService);

    await deleteBlock.execute(block_id as string);

    return response.status(200).json();
  }
}

export { DeleteBlockController };
