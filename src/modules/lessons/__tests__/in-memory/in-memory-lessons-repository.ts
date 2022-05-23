import { ILesson } from '@modules/lessons/domain/entities/ilesson';
import { ILessonsRepository } from '@modules/lessons/domain/repositories/lessons-repository';
import { CreateLessonDTO } from '@modules/lessons/dtos/create-lesson-dto';
import { FindAllLessonsFromBlockDTO } from '@modules/lessons/dtos/find-all-lessons-from-block-dto';
import { FindByNameDTO } from '@modules/lessons/dtos/find-by-name-dto';
import { FindBySlugDTO } from '@modules/lessons/dtos/find-by-slug-dto';
import { Lesson } from '@modules/lessons/entities/lesson';
import { AsyncMaybe } from '@shared/types/app';

class InMemoryLessonsRepository implements ILessonsRepository {
  private lessons: ILesson[] = [];

  async findLessonWithMostViews(): AsyncMaybe<ILesson> {
    return this.lessons[0];
  }

  async findBySlug({ slug }: FindBySlugDTO): AsyncMaybe<ILesson> {
    const lessonFinded = this.lessons.find(lesson => lesson.slug === slug);

    return lessonFinded;
  }

  async findAllLessonsFromBlock({
    block_id,
  }: FindAllLessonsFromBlockDTO): Promise<ILesson[]> {
    const lessons = this.lessons.filter(lesson => lesson.block_id === block_id);

    return lessons;
  }

  async findByName({ name }: FindByNameDTO): AsyncMaybe<ILesson> {
    const lessonFinded = this.lessons.find(lesson => lesson.name === name);

    return lessonFinded;
  }

  async save(lesson: ILesson): Promise<ILesson> {
    const index = this.lessons.findIndex(
      findLesson => findLesson.id === lesson.id,
    );

    this.lessons[index] = lesson;

    return lesson;
  }

  async findAllLessons(): Promise<ILesson[]> {
    return this.lessons;
  }

  async create(data: CreateLessonDTO): Promise<ILesson> {
    const lesson = new Lesson();

    Object.assign(lesson, data);

    this.lessons.push(lesson);

    return lesson;
  }

  async findById(lesson_id: string): AsyncMaybe<ILesson> {
    const lessonFinded = this.lessons.find(lesson => lesson.id === lesson_id);

    return lessonFinded;
  }

  async destroyById(lesson_id: string): Promise<void> {
    const index = this.lessons.findIndex(lesson => lesson.id === lesson_id);

    this.lessons.splice(index, 1);
  }
}

export { InMemoryLessonsRepository };
