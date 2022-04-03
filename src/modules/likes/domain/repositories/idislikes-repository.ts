import { CreateDislikeDTO } from '@modules/likes/dtos/create-dislike-dto';
import { FindOneDislikeFromUserClass } from '@modules/likes/dtos/find-one-dislike-from-user-class';
import { AsyncMaybe } from '@shared/types/app';
import { IDislike } from '../entities/idislike';

interface IDislikesRepository {
  create(data: CreateDislikeDTO): Promise<IDislike>;
  createMany(datas: CreateDislikeDTO[]): Promise<void>;
  findById(dislike_id: string): AsyncMaybe<IDislike>;
  findAllDislikesFromClass(class_id: string): Promise<IDislike[]>;
  findAllDislikesFromUser(user_id: string): Promise<IDislike[]>;
  findOneDislikeFromUserClass(
    data: FindOneDislikeFromUserClass,
  ): AsyncMaybe<IDislike>;
  save(dislike: IDislike): Promise<void>;
  destroyById(dislike_id: string): Promise<void>;
}
export { IDislikesRepository };
