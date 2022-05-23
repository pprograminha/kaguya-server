import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ListAllBlocksFromPlaylistController } from '../controllers/list-all-blocks-from-playlist-controller';
import { ShowBlockController } from '../controllers/show-block-controller';

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
      skip: Joi.number(),
      take: Joi.number(),
      order: Joi.string()
        .regex(/(asc|desc)/)
        .trim(),
    },
  }),
  listAllBlocksFromPlaylistController.handle,
);

blocksRouter.get(
  '/show',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      block_id: Joi.string().uuid(),
      block_slug: Joi.string()
        .regex(/^[a-z](-?[a-z])*$/)
        .max(100),
      playlist_slug: Joi.string()
        .regex(/^[a-z](-?[a-z])*$/)
        .max(100),
    },
  }),
  showBlockController.handle,
);

export { blocksRouter };
