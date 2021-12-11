import { UpdateTrailAvatarService } from '@modules/trails/services/UpdateTrailAvatarService';
import { classToClass } from '@shared/helpers/classToClass';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateTrailAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const avatar = request.file?.filename;

    const { trail_id } = request.body;

    const updateTrailAvatar = container.resolve(UpdateTrailAvatarService);

    const trail = await updateTrailAvatar.execute({
      avatar,
      trail_id,
    });

    return response.status(200).json(classToClass('trail', trail));
  }
}
