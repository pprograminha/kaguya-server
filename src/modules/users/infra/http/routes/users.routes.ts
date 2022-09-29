import { storageConfig } from '@config/storage';
import { UpdateUserAvatarController } from '@modules/trails/infra/http/controllers/update-user-avatar-controller';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from '../controllers/create-user-controller';
import { DisableUserController } from '../controllers/disable-user-controller';
import { ListTheUsersAssociatedWithTheTrailController } from '../controllers/list-the-users-associated-with-the-trail-controller';
import { RemoveUserController } from '../controllers/remove-user-controller';
import { UpdateUserController } from '../controllers/update-user-controller';
import { ValidateTokenController } from '../controllers/validate-token-controller';
import ensureAuthenticated from '../middlewares/ensure-authenticated';

const usersRouter = Router();
const upload = multer(storageConfig.multer);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const validateTokenController = new ValidateTokenController();
const listTheUsersAssociatedWithTheTrailController =
  new ListTheUsersAssociatedWithTheTrailController();
const disableUserController = new DisableUserController();
const removeUserController = new RemoveUserController();

const updateUserController = new UpdateUserController();
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
  '/disable',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {},
  }),
  disableUserController.handle,
);

usersRouter.delete(
  '/remove',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {},
  }),
  removeUserController.handle,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.handle,
);

usersRouter.put(
  '/update-user',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).max(100),
      username: Joi.string().min(2).max(100),
      password: Joi.alternatives(['', Joi.string().min(8).max(100)]),
    },
  }),
  updateUserController.handle,
);

export { usersRouter };
