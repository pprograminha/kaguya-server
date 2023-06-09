import { CreatePlaylistFromTrailService } from '@modules/playlists/services/create-playlist-from-trail-service';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreatePlaylistFromTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, trail_id, slug } = request.body;

    const createPlaylistFromTrail = container.resolve(
      CreatePlaylistFromTrailService,
    );

    const playlistCreated = await createPlaylistFromTrail.execute({
      description,
      name,
      slug,
      trail_id,
    });

    return response
      .status(201)
      .json(instanceToInstance('playlist', playlistCreated));
  }
}
