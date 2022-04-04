import { IPlaylist } from '@modules/playlists/domain/entities/iplaylist';
import { ListAllPlaylistsFromTrailService } from '@modules/playlists/services/list-all-playlists-from-trail-service';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllPlaylistsFromTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { trail_id, skip, take, order } = request.query;
    const user_id = request.user.id;

    const listAllPlaylistsFromTrail = container.resolve(
      ListAllPlaylistsFromTrailService,
    );

    const playlists = await listAllPlaylistsFromTrail.execute({
      trail_id: trail_id as string,
      skip: skip as number | undefined,
      take: take as number | undefined,
      order: order as 'desc' | 'asc',
      user_id,
    });

    return response
      .status(200)
      .json(
        playlists.map(playlist =>
          instanceToInstance('playlist', playlist as unknown as IPlaylist),
        ),
      );
  }
}
