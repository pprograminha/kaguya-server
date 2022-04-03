import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { ShowTrailService } from '@modules/trails/services/ShowTrailService';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { trail_id, name } = request.query;
    const user_id = request.user.id;

    const showTrail = container.resolve(ShowTrailService);

    const trail = await showTrail.execute({
      trail_id: trail_id as string,
      user_id,
      name: name as string,
    });

    return response
      .status(200)
      .json(instanceToInstance('trail', trail as unknown as ITrail));
  }
}
