import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ListAllBlocksFromPlaylistController } from '../controllers/ListAllBlocksFromPlaylistController';

const blocksRouter = Router();

const listAllBlocksFromPlaylistController =
  new ListAllBlocksFromPlaylistController();

blocksRouter.get(
  '/playlist-list-all',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      playlist_id: Joi.string().uuid().required(),
    },
  }),
  listAllBlocksFromPlaylistController.handle,
);

export { blocksRouter };
