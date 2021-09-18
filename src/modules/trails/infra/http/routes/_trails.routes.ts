import { storageConfig } from '@config/storage';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensureSubAdministrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import { CreateTrailController } from '../controllers/CreateTrailController';
import { DestroyTrailController } from '../controllers/DestroyTrailController';
import { UpdateTrailAvatarController } from '../controllers/UpdateTrailAvatarController';
import { UpdateTrailController } from '../controllers/UpdateTrailController';

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
      description: Joi.string().max(255).required(),
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
      description: Joi.string().max(255),
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