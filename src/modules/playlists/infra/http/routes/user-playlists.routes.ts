import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ListAllUserPlaylistsFromTrailController } from '../controllers/list-all-user-playlists-from-trail-controller';

const userPlaylistsRouter = Router();

const listAllUserPlaylistsFromTrailController =
  new ListAllUserPlaylistsFromTrailController();

userPlaylistsRouter.get(
  '/trail-list-all',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      trail_id: Joi.string().uuid().required(),
    },
  }),
  listAllUserPlaylistsFromTrailController.handle,
);

export { userPlaylistsRouter };
