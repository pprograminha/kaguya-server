import { FiltersDTO } from '@modules/trails/domain/repositories/ITrailsRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUser } from '../entities/IUser';

interface IRelationshipsDTO {
  user_roles?: boolean;
}
export type FindAllUsersAssociatedWithTheTrailDTO = {
  trail_id: string;
} & FiltersDTO;

export type FindAllUsersAssociatedWithTheBlockDTO = {
  block_id: string;
} & FiltersDTO;

export type FindAllUsersAssociatedWithThePlaylistDTO = {
  playlist_id: string;
} & FiltersDTO;

interface IUsersRepository {
  findByEmail(
    email: string,
    relationships?: IRelationshipsDTO,
  ): Promise<IUser | undefined>;
  findAllUsersAssociatedWithThePlaylist(
    filters: FindAllUsersAssociatedWithThePlaylistDTO,
  ): Promise<IUser[]>;
  findAllUsersAssociatedWithTheTrail(
    filters: FindAllUsersAssociatedWithTheTrailDTO,
  ): Promise<IUser[]>;
  findAllUsersAssociatedWithTheBlock(
    filters: FindAllUsersAssociatedWithTheBlockDTO,
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

  findAll(filters: FiltersDTO): Promise<IUser[]>;
}
export { IUsersRepository, IRelationshipsDTO };
