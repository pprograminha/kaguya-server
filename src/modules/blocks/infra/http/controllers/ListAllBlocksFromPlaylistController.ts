import { ListAllBlocksFromPlaylistService } from '@modules/blocks/services/ListAllBlocksFromPlaylistService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListAllBlocksFromPlaylistController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { playlist_id } = request.query;

    const listAllBlocksFromPlaylist = container.resolve(
      ListAllBlocksFromPlaylistService,
    );

    const blocks = await listAllBlocksFromPlaylist.execute(
      playlist_id as string,
    );

    return response.status(200).json(classToClass(blocks));
  }
}

export { ListAllBlocksFromPlaylistController };
