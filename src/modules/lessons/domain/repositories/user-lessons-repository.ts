import { CreateUserLessonDTO } from '@modules/lessons/dtos/create-user-lesson-dto';
import { FindAllUserLessonsFromBlockDTO } from '@modules/lessons/dtos/find-all-user-lessons-from-block-dto';
import { FindOneDTO } from '@modules/lessons/dtos/find-one-dto';
import { AsyncMaybe } from '@shared/types/app';
import { IUserLesson } from '../entities/iuser-lesson';

export type FindUserLessonDTO = {
  block_id: string;
} & FindOneDTO;
interface IUserLessonsRepository {
  create(data: CreateUserLessonDTO): Promise<IUserLesson>;
  findById(user_lesson_id: string): AsyncMaybe<IUserLesson>;
  findOne(data: FindOneDTO): AsyncMaybe<IUserLesson>;
  findUserLesson(data: FindUserLessonDTO): AsyncMaybe<IUserLesson>;
  findAllUserLessons(user_id: string): Promise<IUserLesson[]>;
  findAllUserLessonsFromBlock(
    data: FindAllUserLessonsFromBlockDTO,
  ): Promise<IUserLesson[]>;
  save(_lesson: IUserLesson): Promise<IUserLesson>;
  removeById(user_lesson_id: string): Promise<void>;
}

export { IUserLessonsRepository };
