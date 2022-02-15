import { ListAllBlocksFromPlaylistService } from '@modules/blocks/services/ListAllBlocksFromPlaylistService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListAllBlocksFromPlaylistController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { playlist_id } = request.query;

    const user_id = request.user.id;

    const listAllBlocksFromPlaylist = container.resolve(
      ListAllBlocksFromPlaylistService,
    );

    const blocks = await listAllBlocksFromPlaylist.execute({
      user_id,
      playlist_id: playlist_id as string,
    });

    return response.status(200).json(instanceToInstance(blocks));
  }
}

export { ListAllBlocksFromPlaylistController };
