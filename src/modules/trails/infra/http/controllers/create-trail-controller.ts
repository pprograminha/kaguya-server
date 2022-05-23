import { CreateTrailService } from '@modules/trails/services/create-trail-service';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, slug, description } = request.body;

    const createTrail = container.resolve(CreateTrailService);

    const trailCreated = await createTrail.execute({
      description,
      slug,
      name,
    });

    return response.status(201).json(instanceToInstance('trail', trailCreated));
  }
}
