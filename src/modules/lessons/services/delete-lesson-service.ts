import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { ILessonsRepository } from '../domain/repositories/lessons-repository';

@injectable()
class DeleteLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {}

  async execute(lesson_id: string): Promise<void> {
    const _lesson = await this.lessonsRepository.findById(lesson_id);

    if (!_lesson) {
      throw new AppError('Lesson does not exist', 12, 400);
    }

    await this.lessonsRepository.destroyById(_lesson.id);
  }
}

export { DeleteLessonService };
