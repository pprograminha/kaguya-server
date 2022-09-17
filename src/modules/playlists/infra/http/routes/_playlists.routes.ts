import { slugRegEx } from '@config/reg-ex';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensure-sub-administrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreatePlaylistFromTrailController } from '../controllers/create-playlist-from-trail-controller';
import { DeletePlaylistController } from '../controllers/delete-playlist-controller';

const _playlistsRouter = Router();

const createPlaylistFromTrailController =
  new CreatePlaylistFromTrailController();
const deletePlaylistController = new DeletePlaylistController();

_playlistsRouter.post(
  '/playlists',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(100).required(),
      slug: Joi.string().regex(slugRegEx).required(),
      description: Joi.string().max(1000).required(),
      trail_id: Joi.string().uuid().required(),
    },
  }),
  createPlaylistFromTrailController.handle,
);

_playlistsRouter.delete(
  '/playlists',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.QUERY]: {
      playlist_id: Joi.string().uuid().required(),
    },
  }),
  deletePlaylistController.handle,
);

export { _playlistsRouter };
