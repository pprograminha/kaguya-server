import { ListAllPlaylistsFromTrailService } from '@modules/playlists/services/ListAllPlaylistsFromTrailService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllPlaylistsFromTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { trail_id } = request.query;

    const listAllPlaylistsFromTrail = container.resolve(
      ListAllPlaylistsFromTrailService,
    );

    const userPlaylists = await listAllPlaylistsFromTrail.execute(
      trail_id as string,
    );

    return response.status(200).json(classToClass(userPlaylists));
  }
}
