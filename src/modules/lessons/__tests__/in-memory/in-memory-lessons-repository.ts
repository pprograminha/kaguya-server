import { ILesson } from '@modules/lessons/domain/entities/ilesson';
import { ILessonsRepository } from '@modules/lessons/domain/repositories/lessons-repository';
import { CreateLessonDTO } from '@modules/lessons/dtos/create-lesson-dto';
import { FindAllLessonsFromBlockDTO } from '@modules/lessons/dtos/find-all-lessons-from-block-dto';
import { FindByNameDTO } from '@modules/lessons/dtos/find-by-name-dto';
import { FindBySlugDTO } from '@modules/lessons/dtos/find-by-slug-dto';
import { Lesson } from '@modules/lessons/entities/lesson';
import { IDislike } from '@modules/likes/domain/entities/idislike';
import { ILike } from '@modules/likes/domain/entities/ilike';
import { Dislike } from '@modules/likes/entities/dislike';
import { Like } from '@modules/likes/entities/like';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

class InMemoryLessonsRepository implements ILessonsRepository {
  private lessons: ILesson[] = [];

  async findLessonWithMostViews(): AsyncMaybe<ILesson> {
    return this.lessons[0];
  }

  async findBySlug({ slug }: FindBySlugDTO): AsyncMaybe<
    ILesson & {
      likes: ILike[];
      dislikes: IDislike[];
    }
  > {
    const lessonFinded = this.lessons.find(lesson => lesson.slug === slug);

    return lessonFinded
      ? {
          ...lessonFinded,
          likes: [
            Object.assign(new Like(), {
              id: crypto.randomUUID(),
              user_id: crypto.randomUUID(),
              lesson_id: lessonFinded.id,
              created_at: new Date(),
              updated_at: new Date(),
            }),
          ],
          dislikes: [
            Object.assign(new Dislike(), {
              id: crypto.randomUUID(),
              user_id: crypto.randomUUID(),
              lesson_id: lessonFinded.id,
              created_at: new Date(),
              updated_at: new Date(),
            }),
          ],
        }
      : undefined;
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

  async findById(lesson_id: string): AsyncMaybe<
    ILesson & {
      likes: ILike[];
      dislikes: IDislike[];
    }
  > {
    const lessonFinded = this.lessons.find(lesson => lesson.id === lesson_id);

    return lessonFinded
      ? {
          ...lessonFinded,
          likes: [
            Object.assign(new Like(), {
              id: crypto.randomUUID(),
              user_id: crypto.randomUUID(),
              lesson_id: lessonFinded.id,
              created_at: new Date(),
              updated_at: new Date(),
            }),
          ],
          dislikes: [
            Object.assign(new Dislike(), {
              id: crypto.randomUUID(),
              user_id: crypto.randomUUID(),
              lesson_id: lessonFinded.id,
              created_at: new Date(),
              updated_at: new Date(),
            }),
          ],
        }
      : undefined;
  }

  async destroyById(lesson_id: string): Promise<void> {
    const index = this.lessons.findIndex(lesson => lesson.id === lesson_id);

    this.lessons.splice(index, 1);
  }
}

export { InMemoryLessonsRepository };
