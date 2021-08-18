import { storageConfig } from '@config/storage';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensureSubAdministrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import { CreateTrailController } from '../controllers/CreateTrailController';

const trailsRouter = Router();

const createTrailController = new CreateTrailController();

const upload = multer(storageConfig.multer);

trailsRouter.use(ensureAuthenticated, ensureSubAdministrator);

trailsRouter.post(
  '/',
  upload.single('avatar'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(100).required(),
      description: Joi.string().max(255).required(),
    },
  }),
  createTrailController.handle,
);

export { trailsRouter };
