import { IUserPlaylist } from '@modules/playlists/domain/entities/IUserPlaylist';
import { IUserPlaylistsRepository } from '@modules/playlists/domain/repositories/IUserPlaylistsRepository';
import { ICreateUserPlaylistDTO } from '@modules/playlists/dtos/ICreateUserPlaylistDTO';
import { IFindAllUserPlaylistsFromTrailDTO } from '@modules/playlists/dtos/IFindAllUserPlaylistsFromTrailDTO';
import { prisma } from '@shared/infra/prisma/connection';
import { v4 as uuid } from 'uuid';

export class PrismaUserPlaylistsRepository implements IUserPlaylistsRepository {
  async createMany(datas: ICreateUserPlaylistDTO[]): Promise<IUserPlaylist[]> {
    const promises = datas.map(async data => {
      const userPlaylist = await prisma.userPlaylist.create({
        data: {
          id: uuid(),
          ...data,
        },
      });

      return userPlaylist;
    });

    return Promise.all(promises) as unknown as IUserPlaylist[];
  }

  async create({
    playlist_id,
    user_id,
    trail_id,
  }: ICreateUserPlaylistDTO): Promise<IUserPlaylist> {
    const userPlaylist = await prisma.userPlaylist.create({
      data: {
        id: uuid(),
        playlist_id,
        user_id,
        trail_id,
      },
    });

    return userPlaylist as IUserPlaylist;
  }

  async findById(user_playlist_id: string): Promise<IUserPlaylist | undefined> {
    const userPlaylist = await prisma.userPlaylist.findUnique({
      where: {
        id: user_playlist_id,
      },
    });

    return userPlaylist as IUserPlaylist;
  }

  async removeById(user_playlist_id: string): Promise<void> {
    await prisma.userPlaylist.delete({
      where: {
        id: user_playlist_id,
      },
    });
  }

  async findAllUserPlaylistsFromTrail({
    trail_id,
    user_id,
  }: IFindAllUserPlaylistsFromTrailDTO): Promise<IUserPlaylist[]> {
    const userPlaylists = await prisma.userPlaylist.findMany({
      where: {
        trail_id,
        user_id,
      },
      include: {
        playlist: {
          include: {
            blocks: {
              include: {
                _count: {
                  select: {
                    user_classes: true,
                  },
                },
                user_classes: {
                  select: {
                    completed: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return userPlaylists as unknown as IUserPlaylist[];
  }
}
