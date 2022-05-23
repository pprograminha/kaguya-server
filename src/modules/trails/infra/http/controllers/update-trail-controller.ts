import { UpdateTrailService } from '@modules/trails/services/update-trail-service';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, slug, description, trail_id } = request.body;

    const updateTrail = container.resolve(UpdateTrailService);

    const trailUpdated = await updateTrail.execute({
      trail_id,
      description,
      name,
      slug,
    });

    return response.status(200).json(instanceToInstance('trail', trailUpdated));
  }
}
