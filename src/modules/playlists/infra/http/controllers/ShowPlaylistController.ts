import { ShowPlaylistService } from '@modules/playlists/services/ShowPlaylistService';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowPlaylistController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { playlist_id, name, trail_id } = request.query;

    const showPlaylist = container.resolve(ShowPlaylistService);

    const playlist = await showPlaylist.execute({
      playlist_id: playlist_id as string,
      name: name as string,
      trail_id: trail_id as string,
    });

    return response.status(200).json(instanceToInstance('playlist', playlist));
  }
}
