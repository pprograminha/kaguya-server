import { DeletePlaylistService } from '@modules/playlists/services/DeletePlaylistService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class DeletePlaylistController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { playlist_id } = request.query;

    const deletePlaylist = container.resolve(DeletePlaylistService);

    await deletePlaylist.execute(playlist_id as string);

    return response.status(200).json();
  }
}
