import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';
import { CreateUserDTO } from '@modules/users/dtos/create-user-dto';
import { AsyncMaybe } from '@shared/types/app';
import { IUser } from '../entities/iuser';

interface IRelationshipsDTO {
  user?: boolean;
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
  ): AsyncMaybe<IUser>;
  findAllUsersAssociatedWithThePlaylist(
    filters: FindAllUsersAssociatedWithThePlaylistDTO,
  ): Promise<IUser[]>;
  findAllUsersAssociatedWithTheTrail(
    filters: FindAllUsersAssociatedWithTheTrailDTO,
  ): Promise<IUser[]>;
  findAllUsersAssociatedWithTheBlock(
    filters: FindAllUsersAssociatedWithTheBlockDTO,
  ): Promise<IUser[]>;
  findById(id: string, relationships?: IRelationshipsDTO): AsyncMaybe<IUser>;
  findByUsername(
    username: string,
    relationships?: IRelationshipsDTO,
  ): AsyncMaybe<IUser>;
  create(data: CreateUserDTO): Promise<IUser>;
  destroy(user_id: string): Promise<void>;
  save(user: IUser): Promise<IUser>;

  findAll(filters: FiltersDTO): Promise<IUser[]>;
}
export { IUsersRepository, IRelationshipsDTO };
