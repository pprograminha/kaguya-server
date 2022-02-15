import { ListAllPlaylistsFromTrailService } from '@modules/playlists/services/ListAllPlaylistsFromTrailService';
import { instanceToInstance } from '@shared/helpers/instanceToInstance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllPlaylistsFromTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { trail_id } = request.query;

    const listAllPlaylistsFromTrail = container.resolve(
      ListAllPlaylistsFromTrailService,
    );

    const playlists = await listAllPlaylistsFromTrail.execute(
      trail_id as string,
    );

    return response
      .status(200)
      .json(playlists.map(playlist => instanceToInstance('playlist', playlist)));
  }
}
