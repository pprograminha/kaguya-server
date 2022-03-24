import { ICreateUserTrailDTO } from '@modules/trails/dtos/ICreateUserTrailDTO';
import { IFindUserTrailDTO } from '@modules/trails/dtos/IFindUserTrailDTO';
import { IRelationshipsDTO } from '@modules/users/domain/repositories/IUsersRepository';
import { IUserTrail } from '../entities/IUserTrail';

interface IUserTrailsRepository {
  create(data: ICreateUserTrailDTO): Promise<IUserTrail>;
  save(userTrail: IUserTrail): Promise<IUserTrail>;
  findById(user_trail_id: string): Promise<IUserTrail | undefined>;
  findUserTrail(data: IFindUserTrailDTO): Promise<IUserTrail | undefined>;
  removeById(user_trail_id: string): Promise<void>;
  findAllUserTrails(
    user_id: string,
    relationship?: IRelationshipsDTO,
  ): Promise<IUserTrail[]>;
}
export { IUserTrailsRepository };
