import { CreatePlaylistFromTrailService } from '@modules/playlists/services/CreatePlaylistFromTrailService';
import { instanceToInstance } from '@shared/helpers/instanceToInstance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreatePlaylistFromTrailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, trail_id } = request.body;

    const createPlaylistFromTrail = container.resolve(
      CreatePlaylistFromTrailService,
    );

    const playlistCreated = await createPlaylistFromTrail.execute({
      description,
      name,
      trail_id,
    });

    return response
      .status(201)
      .json(instanceToInstance('playlist', playlistCreated));
  }
}
