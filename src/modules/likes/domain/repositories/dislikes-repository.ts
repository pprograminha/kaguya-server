import { CreateDislikeDTO } from '@modules/likes/dtos/create-dislike-dto';
import { FindOneDislikeFromUserLesson } from '@modules/likes/dtos/find-one-dislike-from-user-lesson';
import { AsyncMaybe } from '@shared/types/app';
import { IDislike } from '../entities/idislike';

interface IDislikesRepository {
  create(data: CreateDislikeDTO): Promise<IDislike>;
  createMany(datas: CreateDislikeDTO[]): Promise<void>;
  findById(dislike_id: string): AsyncMaybe<IDislike>;
  findAllDislikesFromLesson(lesson_id: string): Promise<IDislike[]>;
  findAllDislikesFromUser(user_id: string): Promise<IDislike[]>;
  findOneDislikeFromUserLesson(
    data: FindOneDislikeFromUserLesson,
  ): AsyncMaybe<IDislike>;
  save(dislike: IDislike): Promise<void>;
  destroyById(dislike_id: string): Promise<void>;
}
export { IDislikesRepository };
