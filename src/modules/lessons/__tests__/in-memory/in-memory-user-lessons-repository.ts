import { IUserLesson } from '@modules/lessons/domain/entities/iuser-lesson';
import { IUserLessonsRepository } from '@modules/lessons/domain/repositories/user-lessons-repository';
import { CreateUserLessonDTO } from '@modules/lessons/dtos/create-user-lesson-dto';
import { FindAllUserLessonsFromBlockDTO } from '@modules/lessons/dtos/find-all-user-lessons-from-block-dto';
import { FindOneDTO } from '@modules/lessons/dtos/find-one-dto';
import { UserLesson } from '@modules/lessons/entities/user-lesson';

import { AsyncMaybe } from '@shared/types/app';

class InMemoryUserLessonsRepository implements IUserLessonsRepository {
  private userLessons: IUserLesson[] = [];

  async findOne({ lesson_id, user_id }: FindOneDTO): AsyncMaybe<IUserLesson> {
    const userLessonFinded = this.userLessons.find(
      userLesson =>
        userLesson.lesson_id === lesson_id && userLesson.user_id === user_id,
    );

    return userLessonFinded;
  }

  async findAllUserLessons(user_id: string): Promise<IUserLesson[]> {
    return this.userLessons.filter(
      userLesson => userLesson.user_id === user_id,
    );
  }

  async findAllUserLessonsFromBlock({
    block_id,
    user_id,
  }: FindAllUserLessonsFromBlockDTO): Promise<IUserLesson[]> {
    return this.userLessons.filter(
      userLesson =>
        userLesson.block_id === block_id && userLesson.user_id === user_id,
    );
  }

  async save(_lesson: IUserLesson): Promise<IUserLesson> {
    const index = this.userLessons.findIndex(
      findLesson => findLesson.id === _lesson.id,
    );

    this.userLessons[index] = _lesson;

    return _lesson;
  }

  async create(data: CreateUserLessonDTO): Promise<IUserLesson> {
    const userLesson = new UserLesson();

    Object.assign(userLesson, data);

    this.userLessons.push(userLesson);

    return userLesson;
  }

  async findById(user_lesson_id: string): AsyncMaybe<IUserLesson> {
    const userLessonFinded = this.userLessons.find(
      userLesson => userLesson.id === user_lesson_id,
    );

    return userLessonFinded;
  }

  async removeById(user_lesson_id: string): Promise<void> {
    const index = this.userLessons.findIndex(
      userLesson => userLesson.id === user_lesson_id,
    );

    this.userLessons.splice(index, 1);
  }
}

export { InMemoryUserLessonsRepository };
