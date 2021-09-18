import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensureSubAdministrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreateBlockController } from '../controllers/CreateBlockController';

const _blocksRouter = Router();

const createBlockController = new CreateBlockController();

_blocksRouter.post(
  '/blocks',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(100).required(),
      playlist_id: Joi.string().uuid().required(),
    },
  }),
  createBlockController.handle,
);

export { _blocksRouter };
