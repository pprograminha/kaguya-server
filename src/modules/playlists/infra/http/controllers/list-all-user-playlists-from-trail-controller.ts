import { ListAllUserPlaylistsFromTrailService } from '@modules/playlists/services/list-all-user-playlists-from-trail-service';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllUserPlaylistsFromTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { trail_id } = request.query;
    const user_id = request.user.id;

    const listAllUserPlaylistsFromTrail = container.resolve(
      ListAllUserPlaylistsFromTrailService,
    );

    const userPlaylists = await listAllUserPlaylistsFromTrail.execute({
      trail_id: trail_id as string,
      user_id,
    });

    return response.status(200).json(
      userPlaylists.map(userPlaylist => ({
        ...userPlaylist,
        playlist: instanceToInstance('playlist', userPlaylist.playlist),
      })),
    );
  }
}
