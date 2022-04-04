import { IUserPlaylist } from '@modules/playlists/domain/entities/iuser-playlist';
import { IUserPlaylistsRepository } from '@modules/playlists/domain/repositories/user-playlists-repository';
import { CreateUserPlaylistDTO } from '@modules/playlists/dtos/create-user-playlist-dto';
import { FindAllUserPlaylistsFromTrailDTO } from '@modules/playlists/dtos/find-all-user-playlists-from-trail-dto';
import { FindOneDTO } from '@modules/playlists/dtos/find-one-dto';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

export class PrismaUserPlaylistsRepository implements IUserPlaylistsRepository {
  async findOne({
    playlist_id,
    user_id,
  }: FindOneDTO): AsyncMaybe<IUserPlaylist> {
    const userPlaylist = await prisma.userPlaylist.findFirst({
      where: {
        playlist_id,
        user_id,
      },
    });
    return userPlaylist as IUserPlaylist;
  }

  async save({ id, progress }: IUserPlaylist): Promise<void> {
    await prisma.userPlaylist.update({
      where: {
        id,
      },
      data: {
        progress,
      },
    });
  }

  async createMany(datas: CreateUserPlaylistDTO[]): Promise<IUserPlaylist[]> {
    const promises = datas.map(async data => {
      const userPlaylist = await prisma.userPlaylist.create({
        data: {
          id: crypto.randomUUID(),
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
  }: CreateUserPlaylistDTO): Promise<IUserPlaylist> {
    const userPlaylist = await prisma.userPlaylist.create({
      data: {
        id: crypto.randomUUID(),
        playlist_id,
        user_id,
        trail_id,
      },
    });

    return userPlaylist as IUserPlaylist;
  }

  async findById(user_playlist_id: string): AsyncMaybe<IUserPlaylist> {
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
  }: FindAllUserPlaylistsFromTrailDTO): Promise<IUserPlaylist[]> {
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
