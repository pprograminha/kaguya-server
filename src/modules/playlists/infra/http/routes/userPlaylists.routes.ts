import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ListAllUserPlaylistsFromTrailController } from '../controllers/ListAllUserPlaylistsFromTrailController';

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
