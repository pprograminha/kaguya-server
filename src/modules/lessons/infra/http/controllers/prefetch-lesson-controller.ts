import { PrefetchLessonService } from '@modules/lessons/services/prefetch-lesson-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class PrefetchLessonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { playlist_slug, trail_slug } = request.query;

    const prefetchLesson = container.resolve(PrefetchLessonService);

    const _lesson = await prefetchLesson.execute({
      playlist_slug: playlist_slug as string,
      trail_slug: trail_slug as string,
    });

    return response.status(200).json(_lesson);
  }
}
