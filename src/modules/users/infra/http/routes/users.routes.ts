import { storageConfig } from '@config/storage';
import { UpdateUserAvatarController } from '@modules/trails/infra/http/controllers/UpdateUserAvatarController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from '../controllers/CreateUserController';
import { ListTheUsersAssociatedWithTheTrailController } from '../controllers/ListTheUsersAssociatedWithTheTrailController';
import { ValidateTokenController } from '../controllers/ValidateTokenController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(storageConfig.multer);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const validateTokenController = new ValidateTokenController();
const listTheUsersAssociatedWithTheTrailController =
  new ListTheUsersAssociatedWithTheTrailController();

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
usersRouter.get(
  '/list-all-users-associated-with-trail',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      skip: Joi.number(),
      take: Joi.number(),
      order: Joi.string().regex(/(asc|desc)/),
      trail_id: Joi.string().uuid().required(),
    },
  }),
  listTheUsersAssociatedWithTheTrailController.handle,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.handle,
);

export { usersRouter };
