import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ListAllPlaylistsFromTrailController } from '../controllers/ListAllPlaylistsFromTrailController';

const playlistsRouter = Router();

const listAllPlaylistsFromTrailController =
  new ListAllPlaylistsFromTrailController();

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

export { playlistsRouter };
