import { FiltersDTO } from '@modules/trails/domain/repositories/ITrailsRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUser } from '../entities/IUser';

interface IRelationshipsDTO {
  user_roles?: boolean;
}
export type FindAllUsersAssociatedWithTheTrailDTO = {
  trail_id: string;
} & FiltersDTO;

interface IUsersRepository {
  findByEmail(
    email: string,
    relationships?: IRelationshipsDTO,
  ): Promise<IUser | undefined>;
  findAllUsersAssociatedWithTheTrail(
    filters: FindAllUsersAssociatedWithTheTrailDTO,
  ): Promise<IUser[]>;
  findById(
    id: string,
    relationships?: IRelationshipsDTO,
  ): Promise<IUser | undefined>;
  findByUsername(
    username: string,
    relationships?: IRelationshipsDTO,
  ): Promise<IUser | undefined>;
  create(data: ICreateUserDTO): Promise<IUser>;
  save(user: IUser): Promise<IUser>;

  findAll(): Promise<IUser[]>;
}
export { IUsersRepository, IRelationshipsDTO };
