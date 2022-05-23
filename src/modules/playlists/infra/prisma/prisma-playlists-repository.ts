import { IPlaylist } from '@modules/playlists/domain/entities/iplaylist';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/playlists-repository';
import { CreatePlaylistDTO } from '@modules/playlists/dtos/create-playlist-dto';
import { FindAllPlaylistsFromTrailDTO } from '@modules/playlists/dtos/find-all-playlists-from-trail-dto';
import { FindByNameDTO } from '@modules/playlists/dtos/find-by-name-dto';
import { FindBySlugDTO } from '@modules/playlists/dtos/find-by-slug-dto';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

export class PrismaPlaylistsRepository implements IPlaylistsRepository {
  async findBySlug({ slug, trail_slug }: FindBySlugDTO): AsyncMaybe<IPlaylist> {
    const playlist = await prisma.playlist.findFirst({
      where: {
        slug,
        trail: {
          slug: trail_slug,
        },
      },
    });

    return playlist as IPlaylist;
  }

  async findByName({ trail_name, name }: FindByNameDTO): AsyncMaybe<IPlaylist> {
    const playlist = await prisma.playlist.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        trail: {
          name: {
            equals: trail_name,
            mode: 'insensitive',
          },
        },
      },
    });
    return playlist as IPlaylist;
  }

  async save({
    id,
    avatar,
    description,
    name,
    slug,
    trail_id,
  }: IPlaylist): Promise<IPlaylist> {
    const playlistUpdated = await prisma.playlist.update({
      where: {
        id,
      },
      data: {
        avatar,
        description,
        name,
        slug,
        trail_id,
        updated_at: new Date(),
      },
    });

    return playlistUpdated as IPlaylist;
  }

  async findAllPlaylists(): Promise<IPlaylist[]> {
    const playlists = await prisma.playlist.findMany();

    return playlists as IPlaylist[];
  }

  async create({
    description,
    name,
    slug,
    trail_id,
  }: CreatePlaylistDTO): Promise<IPlaylist> {
    const playlist = await prisma.playlist.create({
      data: {
        id: crypto.randomUUID(),
        description,
        name,
        slug,
        trail_id,
      },
    });

    return playlist as IPlaylist;
  }

  async findById(playlist_id: string): AsyncMaybe<IPlaylist> {
    const playlist = await prisma.playlist.findUnique({
      where: {
        id: playlist_id,
      },
    });

    return playlist as IPlaylist;
  }

  async destroyById(playlist_id: string): Promise<void> {
    await prisma.playlist.delete({
      where: {
        id: playlist_id,
      },
    });
  }

  async findAllPlaylistsFromTrail({
    trail_id,
    order,
    skip,
    take,
  }: FindAllPlaylistsFromTrailDTO): Promise<IPlaylist[]> {
    const playlists = await prisma.playlist.findMany({
      where: {
        trail_id,
      },
      include: {
        user_playlists: true,
      },
      ...(order
        ? {
            orderBy: {
              created_at: order,
            },
          }
        : {}),
      skip,
      take,
    });

    return playlists as IPlaylist[];
  }
}
