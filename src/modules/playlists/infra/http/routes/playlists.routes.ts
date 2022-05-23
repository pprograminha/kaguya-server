import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ListAllPlaylistsFromTrailController } from '../controllers/list-all-playlists-from-trail-controller';
import { ShowPlaylistController } from '../controllers/show-playlist-controller';

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
      skip: Joi.number(),
      take: Joi.number(),
      order: Joi.string()
        .regex(/(asc|desc)/)
        .trim(),
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
      trail_slug: Joi.string()
        .regex(/^[a-z](-?[a-z])*$/)
        .max(100),
      playlist_slug: Joi.string()
        .regex(/^[a-z](-?[a-z])*$/)
        .max(100),
    },
  }),
  showPlaylistController.handle,
);

export { playlistsRouter };
