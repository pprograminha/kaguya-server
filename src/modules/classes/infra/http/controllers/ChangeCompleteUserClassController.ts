import { ChangeCompleteUserClassService } from '@modules/classes/services/ChangeCompleteUserClassService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ChangeCompleteUserClassController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { class_id } = request.body;
    const user_id = request.user.id;

    const changeCompleteUserClass = container.resolve(
      ChangeCompleteUserClassService,
    );

    const userClass = await changeCompleteUserClass.execute({
      user_id,
      class_id,
    });

    return response.status(200).json(userClass);
  }
}
