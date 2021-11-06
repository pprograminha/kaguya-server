import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensureSubAdministrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreatePlaylistFromTrailController } from '../controllers/CreatePlaylistFromTrailController';
import { DeletePlaylistController } from '../controllers/DeletePlaylistController';

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
      description: Joi.string().max(255).required(),
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
