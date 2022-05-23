import { ITrail } from '@modules/trails/domain/entities/itrail';
import { ShowTrailService } from '@modules/trails/services/show-trail-service';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { trail_id, slug } = request.query;
    const user_id = request.user.id;

    const showTrail = container.resolve(ShowTrailService);

    const trail = await showTrail.execute({
      trail_id: trail_id as string,
      user_id,
      slug: slug as string,
    });

    return response
      .status(200)
      .json(instanceToInstance('trail', trail as unknown as ITrail));
  }
}
