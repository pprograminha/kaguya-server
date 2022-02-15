import { RemoveUserTrailService } from '@modules/trails/services/RemoveUserTrailService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class RemoveUserTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { trail_id } = request.query;

    const user_id = request.user.id;

    const removeUserTrail = container.resolve(RemoveUserTrailService);

    await removeUserTrail.execute({
      user_id,
      trail_id: trail_id as string,
    });

    return response.status(200).json();
  }
}
