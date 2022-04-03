import { ChangeUserTrailEnabledFieldService } from '@modules/trails/services/change-user-trail-enabled-field-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ChangeUserTrailEnabledFieldController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { trail_id } = request.body;
    const user_id = request.user.id;

    const changeUserTrailEnabledField = container.resolve(
      ChangeUserTrailEnabledFieldService,
    );

    const userTrail = await changeUserTrailEnabledField.execute({
      trail_id,
      user_id,
    });

    return response.status(200).json(userTrail);
  }
}
