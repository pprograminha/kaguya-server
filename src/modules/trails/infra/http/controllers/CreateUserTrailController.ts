import { instanceToInstance } from 'class-transformer';
import { CreateUserTrailService } from '@modules/trails/services/CreateUserTrailService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateUserTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { trail_id } = request.body;

    const user_id = request.user.id;

    const createUserTrail = container.resolve(CreateUserTrailService);

    const userTrailCreated = await createUserTrail.execute({
      user_id,
      trail_id,
    });

    return response.status(201).json(instanceToInstance(userTrailCreated));
  }
}
