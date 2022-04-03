import { IPlaylist } from '@modules/playlists/domain/entities/iplaylist';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/iplaylists-repository';
import { CreatePlaylistDTO } from '@modules/playlists/dtos/create-playlist-dto';
import { FindByNameDTO } from '@modules/playlists/dtos/find-by-name-dto';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

export class PrismaPlaylistsRepository implements IPlaylistsRepository {
  async findByName({ trail_name, name }: FindByNameDTO): AsyncMaybe<IPlaylist> {
    const playlist = await prisma.playlist.findFirst({
      where: {
        name: {
          equals: name.replace(/-/g, ' '),
          mode: 'insensitive',
        },
        trail: {
          name: {
            equals: trail_name.replace(/-/g, ' '),
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
    trail_id,
  }: CreatePlaylistDTO): Promise<IPlaylist> {
    const playlist = await prisma.playlist.create({
      data: {
        id: crypto.randomUUID(),
        description,
        name,
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

  async findAllPlaylistsFromTrail(trail_id: string): Promise<IPlaylist[]> {
    const playlists = await prisma.playlist.findMany({
      where: {
        trail_id,
      },
    });

    return playlists as IPlaylist[];
  }
}
