import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/IPlaylistsRepository';
import { ICreatePlaylistDTO } from '@modules/playlists/dtos/ICreatePlaylistDTO';
import { prisma } from '@shared/infra/prisma/connection';
import { v4 as uuid } from 'uuid';

export class PrismaPlaylistsRepository implements IPlaylistsRepository {
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
  }: ICreatePlaylistDTO): Promise<IPlaylist> {
    const playlist = await prisma.playlist.create({
      data: {
        id: uuid(),
        description,
        name,
        trail_id,
      },
    });

    return playlist as IPlaylist;
  }

  async findById(playlist_id: string): Promise<IPlaylist | undefined> {
    const playlist = await prisma.playlist.findUnique({
      where: {
        id: playlist_id,
      },
    });

    return (playlist as IPlaylist | null) || undefined;
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
