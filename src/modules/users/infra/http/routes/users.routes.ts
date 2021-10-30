import { storageConfig } from '@config/storage';
import { UpdateUserAvatarController } from '@modules/trails/infra/http/controllers/UpdateUserAvatarController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from '../controllers/CreateUserController';
import { ValidateTokenController } from '../controllers/ValidateTokenController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(storageConfig.multer);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const validateTokenController = new ValidateTokenController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().max(100).required(),
      username: Joi.string().min(2).max(100).required(),
      password: Joi.string().min(8).max(100).required(),
    },
  }),
  createUserController.handle,
);

usersRouter.post('/tokens/validate-token', validateTokenController.handle);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.handle,
);

export { usersRouter };
