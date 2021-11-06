import { DeleteClassService } from '@modules/classes/services/DeleteClassService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class DeleteClassController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { class_id } = request.query;

    const deleteClass = container.resolve(DeleteClassService);

    await deleteClass.execute(class_id as string);

    return response.status(200).json();
  }
}
