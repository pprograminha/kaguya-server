import { DeleteLessonService } from '@modules/lessons/services/delete-lesson-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class DeleteLessonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { lesson_id } = request.query;

    const deleteLesson = container.resolve(DeleteLessonService);

    await deleteLesson.execute(lesson_id as string);

    return response.status(200).json();
  }
}
