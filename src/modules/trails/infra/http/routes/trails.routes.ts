import { storageConfig } from '@config/storage';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensureSubAdministrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import { CreateTrailController } from '../controllers/CreateTrailController';
import { DestroyTrailController } from '../controllers/DestroyTrailController';
import { ListAllTrailsController } from '../controllers/ListAllTrailsController';
import { UpdateTrailAvatarController } from '../controllers/UpdateTrailAvatarController';
import { UpdateTrailController } from '../controllers/UpdateTrailController';

const trailsRouter = Router();

const createTrailController = new CreateTrailController();
const listAllTrailsController = new ListAllTrailsController();
const destroyTrailController = new DestroyTrailController();
const updateTrailController = new UpdateTrailController();
const updateTrailAvatarController = new UpdateTrailAvatarController();

const upload = multer(storageConfig.multer);

trailsRouter.use(ensureAuthenticated, ensureSubAdministrator);

trailsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(100).required(),
      description: Joi.string().max(255).required(),
    },
  }),
  createTrailController.handle,
);

trailsRouter.get('/list-all', listAllTrailsController.handle);

trailsRouter.delete(
  '/',
  celebrate({
    [Segments.QUERY]: {
      trail_id: Joi.string().uuid().required(),
    },
  }),
  destroyTrailController.handle,
);

trailsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      trail_id: Joi.string().uuid().required(),
      name: Joi.string().max(100),
      description: Joi.string().max(255),
    },
  }),
  updateTrailController.handle,
);

trailsRouter.patch(
  '/avatar',
  upload.single('avatar'),
  updateTrailAvatarController.handle,
);

export { trailsRouter };
