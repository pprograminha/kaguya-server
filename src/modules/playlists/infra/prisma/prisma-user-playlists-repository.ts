import { IUserPlaylist } from '@modules/playlists/domain/entities/iuser-playlist';
import {
  FindUserPlaylistDTO,
  IUserPlaylistsRepository
} from '@modules/playlists/domain/repositories/user-playlists-repository';
import { CreateUserPlaylistDTO } from '@modules/playlists/dtos/create-user-playlist-dto';
import { FindAllUserPlaylistsFromTrailDTO } from '@modules/playlists/dtos/find-all-user-playlists-from-trail-dto';
import { FindOneDTO } from '@modules/playlists/dtos/find-one-dto';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

export class PrismaUserPlaylistsRepository implements IUserPlaylistsRepository {
  async findTrailProgressByPlaylists({
    trail_id,
    user_id,
  }: FindAllUserPlaylistsFromTrailDTO): Promise<number> {
    const userPlaylists = await prisma.userPlaylist.findMany({
      where: {
        trail_id,
        user_id,
      },
      select: {
        playlist: {
          select: {
            blocks: {
              select: {
                lessons: {
                  select: {
                    user_lessons: {
                      select: {
                        completed: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const lessonsCount = userPlaylists
      .map(userPlaylist => {
        return userPlaylist.playlist.blocks
          .map(block => block.lessons.map(lesson => lesson.user_lessons).flat())
          .flat();
      })
      .flat().length;

    const lessonsCompletedCount = userPlaylists
      .map(userPlaylist => {
        return userPlaylist.playlist.blocks
          .map(block => block.lessons.map(lesson => lesson.user_lessons).flat())
          .flat();
      })
      .flat()
      .filter(lesson => lesson.completed).length;

    const trailProgress = (lessonsCompletedCount / lessonsCount || 0) * 100;

    return Number(trailProgress.toFixed(0));
  }

  async findUserPlaylist({
    playlist_id,
    trail_id,
    user_id,
  }: FindUserPlaylistDTO): AsyncMaybe<IUserPlaylist> {
    const userPlaylist = await prisma.userPlaylist.findFirst({
      where: {
        playlist_id,
        trail_id,
        user_id,
      },
    });
    return userPlaylist as IUserPlaylist;
  }

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
                    user_lessons: true,
                  },
                },
                user_lessons: {
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
