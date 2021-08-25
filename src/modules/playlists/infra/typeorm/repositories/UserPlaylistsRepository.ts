import { IUserPlaylist } from '@modules/playlists/domain/entities/IUserPlaylist';
import { IUserPlaylistsRepository } from '@modules/playlists/domain/repositories/IUserPlaylistsRepository';
import { ICreateUserPlaylistDTO } from '@modules/playlists/dtos/ICreateUserPlaylistDTO';
import { IFindAllUserPlaylistsFromTrailDTO } from '@modules/playlists/dtos/IFindAllUserPlaylistsFromTrailDTO';
import { getRepository, Repository } from 'typeorm';
import { UserPlaylist } from '../entities/UserPlaylist';

export class UserPlaylistsRepository implements IUserPlaylistsRepository {
  private ormRepository: Repository<IUserPlaylist>;

  constructor() {
    this.ormRepository = getRepository(UserPlaylist);
  }

  async create({
    playlist_id,
    user_id,
  }: ICreateUserPlaylistDTO): Promise<IUserPlaylist> {
    const userPlaylist = this.ormRepository.create({
      playlist_id,
      user_id,
    });

    await this.ormRepository.save(userPlaylist);

    return userPlaylist;
  }

  async findById(user_playlist_id: string): Promise<IUserPlaylist | undefined> {
    const userPlaylist = await this.ormRepository.findOne({
      where: {
        id: user_playlist_id,
      },
    });

    return userPlaylist;
  }

  async removeById(user_playlist_id: string): Promise<void> {
    await this.ormRepository.delete(user_playlist_id);
  }

  async findAllUserPlaylistsFromTrail({
    trail_id,
    user_id,
  }: IFindAllUserPlaylistsFromTrailDTO): Promise<IUserPlaylist[]> {
    const userPlaylists = await this.ormRepository.find({
      where: {
        trail_id,
        user_id,
      },
    });

    return userPlaylists;
  }
}
