import { CreateLessonService } from '@modules/lessons/services/create-lesson-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateLessonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { block_id, description, link, name } = request.body;

    const createLesson = container.resolve(CreateLessonService);

    const lessonCreated = await createLesson.execute({
      block_id,
      description,
      link,
      name,
    });

    return response.status(201).json(lessonCreated);
  }
}
