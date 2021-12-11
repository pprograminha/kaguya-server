import { CreateTrailService } from '@modules/trails/services/CreateTrailService';
import { classToClass } from '@shared/helpers/classToClass';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createTrail = container.resolve(CreateTrailService);

    const trailCreated = await createTrail.execute({
      description,
      name,
    });

    return response.status(201).json(classToClass('trail', trailCreated));
  }
}
