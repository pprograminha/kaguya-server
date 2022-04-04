import { ShowPlaylistService } from '@modules/playlists/services/show-playlist-service';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowPlaylistController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { playlist_id, playlist_slug, trail_slug } = request.query;

    const showPlaylist = container.resolve(ShowPlaylistService);

    const playlist = await showPlaylist.execute({
      playlist_id: playlist_id as string,
      playlist_slug: playlist_slug as string,
      trail_slug: trail_slug as string,
    });

    return response.status(200).json(instanceToInstance('playlist', playlist));
  }
}
