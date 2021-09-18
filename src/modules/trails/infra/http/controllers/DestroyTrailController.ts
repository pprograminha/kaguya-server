import { DestroyTrailService } from '@modules/trails/services/DestroyTrailService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class DestroyTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { trail_id } = request.query;

    const destroyTrail = container.resolve(DestroyTrailService);

    await destroyTrail.execute(trail_id as string);

    return response.status(200).json();
  }
}
