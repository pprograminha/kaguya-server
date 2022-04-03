import { FiltersDTO } from '@modules/trails/domain/repositories/ITrailsRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/entities/user';
import { AsyncMaybe } from '@shared/types/app';
import { IUser } from '../../domain/entities/iuser';
import {
  FindAllUsersAssociatedWithTheBlockDTO,
  FindAllUsersAssociatedWithThePlaylistDTO,
  FindAllUsersAssociatedWithTheTrailDTO,
  IUsersRepository,
} from '../../domain/repositories/iusers-repository';

class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  async findAllUsersAssociatedWithThePlaylist({
    playlist_id,
  }: FindAllUsersAssociatedWithThePlaylistDTO): Promise<IUser[]> {
    const users = this.users.filter(user => {
      return user.user_playlists.some(
        user_playlist => user_playlist.playlist.id === playlist_id,
      );
    });

    return users;
  }

  async findAllUsersAssociatedWithTheBlock({
    block_id,
  }: FindAllUsersAssociatedWithTheBlockDTO): Promise<IUser[]> {
    const users = this.users.filter(findUser => {
      return findUser.user_blocks.some(
        user_block => user_block.block.id === block_id,
      );
    });

    return users;
  }

  async findAllUsersAssociatedWithTheTrail(
    filters: FindAllUsersAssociatedWithTheTrailDTO & FiltersDTO,
  ): Promise<IUser[]> {
    const users = this.users.filter(user => {
      return user.user_trails.some(
        user_trail => user_trail.trail.id === filters.trail_id,
      );
    });

    return users;
  }

  async findByUsername(username: string): AsyncMaybe<IUser> {
    const userFinded = this.users.find(user => user.username === username);

    return userFinded;
  }

  async findAll(): Promise<IUser[]> {
    return this.users;
  }

  async save(user: IUser): Promise<IUser> {
    const indexFinded = this.users.findIndex(
      userFind => userFind.id === user.id,
    );

    if (indexFinded === -1) return user;

    this.users[indexFinded] = user;

    return user;
  }

  async create(userData: ICreateUserDTO): Promise<IUser> {
    const user = new User();

    Object.assign(user, userData);

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): AsyncMaybe<IUser> {
    const user = this.users.find(findUser => findUser.email === email);
    return user;
  }

  async findById(id: string | number): AsyncMaybe<IUser> {
    const user = this.users.find(findUser => findUser.id === id);
    return user;
  }
}
export { FakeUsersRepository };
