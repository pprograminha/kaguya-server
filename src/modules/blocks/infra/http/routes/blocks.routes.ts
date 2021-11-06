import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ListAllBlocksFromPlaylistController } from '../controllers/ListAllBlocksFromPlaylistController';
import { ShowBlockController } from '../controllers/ShowBlockController';

const blocksRouter = Router();

const listAllBlocksFromPlaylistController =
  new ListAllBlocksFromPlaylistController();
const showBlockController = new ShowBlockController();

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

blocksRouter.get(
  '/show',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      block_id: Joi.string().uuid().required(),
    },
  }),
  showBlockController.handle,
);

export { blocksRouter };
