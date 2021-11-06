import { ShowClassService } from '@modules/classes/services/ShowClassService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowClassController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { class_id } = request.query;

    const showClass = container.resolve(ShowClassService);

    const _class = await showClass.execute(class_id as string);

    return response.status(200).json(classToClass(_class));
  }
}
