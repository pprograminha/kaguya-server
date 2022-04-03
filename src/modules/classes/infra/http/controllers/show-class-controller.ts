import { ShowClassService } from '@modules/classes/services/show-class-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowClassController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { class_id, block_slug, class_slug } = request.query;

    const user_id = request.user.id;

    const showClass = container.resolve(ShowClassService);

    const _class = await showClass.execute({
      class_id: class_id as string,
      block_slug: block_slug as string,
      user_id,
      class_slug: class_slug as string,
    });

    return response.status(200).json(_class);
  }
}
