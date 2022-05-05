import { ITrail } from '@modules/trails/domain/entities/itrail';
import { CreateUserTrailService } from '@modules/trails/services/create-user-trail-service';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateUserTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { trail_id } = request.body;

    const user_id = request.user.id;

    const createUserTrail = container.resolve(CreateUserTrailService);

    const createdUserTrail = await createUserTrail.execute({
      user_id,
      trail_id,
    });

    return response
      .status(201)
      .json(instanceToInstance('trail', createdUserTrail as unknown as ITrail));
  }
}
