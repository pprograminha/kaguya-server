import { FindAllUserTrailsDTO } from '@modules/trails/dtos/find-all-user-trails-dto';
import { CreateUserTrailDTO } from '@modules/trails/dtos/create-user-trail-dto';
import { FindUserTrailDTO } from '@modules/trails/dtos/find-user-trail-dto';
import { AsyncMaybe } from '@shared/types/app';
import { IUserTrail } from '../entities/iuser-trail';

interface IUserTrailsRepository {
  create(data: CreateUserTrailDTO): Promise<IUserTrail>;
  save(userTrail: IUserTrail): Promise<IUserTrail>;
  findById(user_trail_id: string): AsyncMaybe<IUserTrail>;
  findUserTrail(data: FindUserTrailDTO): AsyncMaybe<IUserTrail>;
  removeById(user_trail_id: string): Promise<void>;
  findAllUserTrails(data: FindAllUserTrailsDTO): Promise<IUserTrail[]>;
}
export { IUserTrailsRepository };
