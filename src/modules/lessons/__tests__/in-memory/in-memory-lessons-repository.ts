import { ILesson } from '@modules/lessons/domain/entities/ilesson';
import { ILessonsRepository } from '@modules/lessons/domain/repositories/lessons-repository';
import { CreateLessonDTO } from '@modules/lessons/dtos/create-lesson-dto';
import { FindAllLessonsFromBlockDTO } from '@modules/lessons/dtos/find-all-lessons-from-block-dto';
import { FindByNameDTO } from '@modules/lessons/dtos/find-by-name-dto';
import { Lesson } from '@modules/lessons/entities/lesson';
import { AsyncMaybe } from '@shared/types/app';

class InMemoryLessonsRepository implements ILessonsRepository {
  private lessons: ILesson[] = [];

  async findAllLessonsFromBlock({
    block_id,
  }: FindAllLessonsFromBlockDTO): Promise<ILesson[]> {
    const lessons = this.lessons.filter(
      _lesson => _lesson.block_id === block_id,
    );

    return lessons;
  }

  async findByName({ name }: FindByNameDTO): AsyncMaybe<ILesson> {
    const lessonFinded = this.lessons.find(_lesson => _lesson.name === name);

    return lessonFinded;
  }

  async save(_lesson: ILesson): Promise<ILesson> {
    const index = this.lessons.findIndex(
      findLesson => findLesson.id === _lesson.id,
    );

    this.lessons[index] = _lesson;

    return _lesson;
  }

  async findAllLessons(): Promise<ILesson[]> {
    return this.lessons;
  }

  async create(data: CreateLessonDTO): Promise<ILesson> {
    const _lesson = new Lesson();

    Object.assign(_lesson, data);

    this.lessons.push(_lesson);

    return _lesson;
  }

  async findById(lesson_id: string): AsyncMaybe<ILesson> {
    const lessonFinded = this.lessons.find(_lesson => _lesson.id === lesson_id);

    return lessonFinded;
  }

  async destroyById(lesson_id: string): Promise<void> {
    const index = this.lessons.findIndex(_lesson => _lesson.id === lesson_id);

    this.lessons.splice(index, 1);
  }
}

export { InMemoryLessonsRepository };
