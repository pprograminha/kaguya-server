import { CreateTrailService } from '@modules/trails/services/CreateTrailService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const avatar = request.file?.filename;
    const { name, description } = request.body;

    const createTrail = container.resolve(CreateTrailService);

    const trailCreated = await createTrail.execute({
      avatar,
      description,
      name,
    });

    return response.status(201).json(trailCreated);
  }
}
