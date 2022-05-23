import { CreateLikeDTO } from '@modules/likes/dtos/create-like-dto';
import { FindOneLikeFromUserLesson } from '@modules/likes/dtos/find-one-like-from-user-lesson';
import { AsyncMaybe } from '@shared/types/app';
import { ILike } from '../entities/ilike';

interface ILikesRepository {
  create(data: CreateLikeDTO): Promise<ILike>;
  createMany(datas: CreateLikeDTO[]): Promise<void>;
  findById(like_id: string): AsyncMaybe<ILike>;
  findAllLikesFromLesson(lesson_id: string): Promise<ILike[]>;
  findAllLikesFromUser(user_id: string): Promise<ILike[]>;
  findOneLikeFromUserLesson(data: FindOneLikeFromUserLesson): AsyncMaybe<ILike>;
  save(like: ILike): Promise<void>;
  destroyById(like_id: string): Promise<void>;
}

export { ILikesRepository };
