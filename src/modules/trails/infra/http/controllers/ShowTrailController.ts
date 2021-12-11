import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { ShowTrailService } from '@modules/trails/services/ShowTrailService';
import { classToClass } from '@shared/helpers/classToClass';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { trail_id } = request.query;

    const showTrail = container.resolve(ShowTrailService);

    const trail = await showTrail.execute({
      trail_id: trail_id as string,
    });

    return response
      .status(200)
      .json(classToClass('trail', trail as unknown as ITrail));
  }
}
