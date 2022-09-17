import { slugRegEx } from '@config/reg-ex';
import { storageConfig } from '@config/storage';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensure-sub-administrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import { CreateTrailController } from '../controllers/create-trail-controller';
import { DestroyTrailController } from '../controllers/destroy-trail-controller';
import { UpdateTrailAvatarController } from '../controllers/update-trail-avatar-controller';
import { UpdateTrailController } from '../controllers/update-trail-controller';

const _trailsRouter = Router();

const createTrailController = new CreateTrailController();
const destroyTrailController = new DestroyTrailController();
const updateTrailController = new UpdateTrailController();
const updateTrailAvatarController = new UpdateTrailAvatarController();

const upload = multer(storageConfig.multer);

_trailsRouter.post(
  '/trails',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(100).required(),
      slug: Joi.string().regex(slugRegEx).required(),
      description: Joi.string().max(1000).required(),
    },
  }),
  createTrailController.handle,
);

_trailsRouter.delete(
  '/trails',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.QUERY]: {
      trail_id: Joi.string().uuid().required(),
    },
  }),
  destroyTrailController.handle,
);

_trailsRouter.put(
  '/trails',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.BODY]: {
      trail_id: Joi.string().uuid().required(),
      name: Joi.string().max(100),
      slug: Joi.string().regex(slugRegEx),
      description: Joi.string().max(1000),
    },
  }),
  updateTrailController.handle,
);

_trailsRouter.patch(
  '/trails/avatar',
  ensureAuthenticated,
  ensureSubAdministrator,
  upload.single('avatar'),
  updateTrailAvatarController.handle,
);

export { _trailsRouter };
