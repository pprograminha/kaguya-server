import { ChangeCompleteUserLessonService } from '@modules/lessons/services/change-complete-user-lesson-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ChangeCompleteUserLessonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { lesson_id } = request.body;
    const user_id = request.user.id;

    const changeCompleteUserLesson = container.resolve(
      ChangeCompleteUserLessonService,
    );

    const userLesson = await changeCompleteUserLesson.execute({
      user_id,
      lesson_id,
    });

    return response.status(200).json(userLesson);
  }
}
