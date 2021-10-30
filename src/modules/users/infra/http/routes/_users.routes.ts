import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { ListAllUsersController } from '../controllers/ListAllUsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureSubAdministrator from '../middlewares/ensureSubAdministrator';

const _usersRouter = Router();

const createUserController = new CreateUserController();
const listAllUsersController = new ListAllUsersController();

_usersRouter.post(
  '/users',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().max(100).required(),
      name: Joi.string().min(2).max(100).required(),
      username: Joi.string().min(2).max(100),
      password: Joi.string().min(8).max(100).required(),
      role: Joi.string().min(2).max(100),
    },
  }),
  createUserController.handle,
);

_usersRouter.get(
  '/users/list-all',
  ensureAuthenticated,
  ensureSubAdministrator,
  listAllUsersController.handle,
);

export { _usersRouter };
