import { ListAllBlocksFromPlaylistRequestDTO } from '@modules/blocks/dtos/list-all-blocks-from-playlist-request-dto';
import { ListAllBlocksFromPlaylistService } from '@modules/blocks/services/list-all-blocks-from-playlist-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListAllBlocksFromPlaylistController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { playlist_id, skip, take, order, playlist_slug, trail_slug } =
      request.query as unknown as ListAllBlocksFromPlaylistRequestDTO;

    const user_id = request.user.id;

    const listAllBlocksFromPlaylist = container.resolve(
      ListAllBlocksFromPlaylistService,
    );

    const blocks = await listAllBlocksFromPlaylist.execute({
      user_id,
      playlist_id,
      playlist_slug,
      trail_slug,
      skip,
      take,
      order,
    });

    return response.status(200).json(blocks);
  }
}

export { ListAllBlocksFromPlaylistController };
