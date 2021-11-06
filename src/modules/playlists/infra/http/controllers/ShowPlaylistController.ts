import { ShowPlaylistService } from '@modules/playlists/services/ShowPlaylistService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowPlaylistController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { playlist_id } = request.query;

    const showPlaylist = container.resolve(ShowPlaylistService);

    const playlist = await showPlaylist.execute({
      playlist_id: playlist_id as string,
    });

    return response.status(200).json(classToClass(playlist));
  }
}
