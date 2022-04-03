import { ICreateUserTrailDTO } from '@modules/trails/dtos/ICreateUserTrailDTO';
import { IFindUserTrailDTO } from '@modules/trails/dtos/IFindUserTrailDTO';
import { IRelationshipsDTO } from '@modules/users/domain/repositories/iusers-repository';
import { AsyncMaybe } from '@shared/types/app';
import { IUserTrail } from '../entities/iuser-trail';

interface IUserTrailsRepository {
  create(data: ICreateUserTrailDTO): Promise<IUserTrail>;
  save(userTrail: IUserTrail): Promise<IUserTrail>;
  findById(user_trail_id: string): AsyncMaybe<IUserTrail>;
  findUserTrail(data: IFindUserTrailDTO): AsyncMaybe<IUserTrail>;
  removeById(user_trail_id: string): Promise<void>;
  findAllUserTrails(
    user_id: string,
    relationship?: IRelationshipsDTO,
  ): Promise<IUserTrail[]>;
}
export { IUserTrailsRepository };
