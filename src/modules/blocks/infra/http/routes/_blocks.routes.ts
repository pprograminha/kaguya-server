import { slugRegEx } from '@config/reg-ex';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensure-sub-administrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreateBlockController } from '../controllers/create-block-controller';
import { DeleteBlockController } from '../controllers/delete-block-controller';

const _blocksRouter = Router();

const createBlockController = new CreateBlockController();
const deleteBlockController = new DeleteBlockController();

_blocksRouter.post(
  '/blocks',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(100).required(),
      slug: Joi.string().regex(slugRegEx).required(),
      playlist_id: Joi.string().uuid().required(),
    },
  }),
  createBlockController.handle,
);

_blocksRouter.delete(
  '/blocks',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.QUERY]: {
      block_id: Joi.string().uuid().required(),
    },
  }),
  deleteBlockController.handle,
);

export { _blocksRouter };
