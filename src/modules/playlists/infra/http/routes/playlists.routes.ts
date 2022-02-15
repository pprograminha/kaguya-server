import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ListAllPlaylistsFromTrailController } from '../controllers/ListAllPlaylistsFromTrailController';
import { ShowPlaylistController } from '../controllers/ShowPlaylistController';

const playlistsRouter = Router();

const listAllPlaylistsFromTrailController =
  new ListAllPlaylistsFromTrailController();
const showPlaylistController = new ShowPlaylistController();

playlistsRouter.get(
  '/trail-list-all',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      trail_id: Joi.string().uuid().required(),
    },
  }),
  listAllPlaylistsFromTrailController.handle,
);

playlistsRouter.get(
  '/show',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      playlist_id: Joi.string().uuid(),
      trail_id: Joi.string().uuid(),
      name: Joi.string(),
    },
  }),
  showPlaylistController.handle,
);

export { playlistsRouter };
