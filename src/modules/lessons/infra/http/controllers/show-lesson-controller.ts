import { ShowLessonService } from '@modules/lessons/services/show-lesson-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowLessonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { lesson_id, block_slug, lesson_slug } = request.query;

    const user_id = request.user.id;

    const showLesson = container.resolve(ShowLessonService);

    const _lesson = await showLesson.execute({
      lesson_id: lesson_id as string,
      block_slug: block_slug as string,
      user_id,
      lesson_slug: lesson_slug as string,
    });

    return response.status(200).json(_lesson);
  }
}
