import { ListAllBlocksFromPlaylistService } from '@modules/blocks/services/list-all-blocks-from-playlist-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListAllBlocksFromPlaylistController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { playlist_id, skip, take, order } = request.query;

    const user_id = request.user.id;

    const listAllBlocksFromPlaylist = container.resolve(
      ListAllBlocksFromPlaylistService,
    );

    const blocks = await listAllBlocksFromPlaylist.execute({
      user_id,
      playlist_id: playlist_id as string,
      skip: skip as number | undefined,
      take: take as number | undefined,
      order: order as 'desc' | 'asc',
    });

    return response.status(200).json(blocks);
  }
}

export { ListAllBlocksFromPlaylistController };
