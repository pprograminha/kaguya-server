import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { ListAllUsersController } from '../controllers/ListAllUsersController';
import ensureAdministrator from '../middlewares/ensureAdministrator';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureSubAdministrator from '../middlewares/ensureSubAdministrator';

const adminsRouter = Router();

const createUserController = new CreateUserController();
const listAllUsersController = new ListAllUsersController();

adminsRouter.post(
  '/users',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().max(100).required(),
      name: Joi.string().min(2).max(100).required(),
      password: Joi.string().min(8).max(100).required(),
      role_name: Joi.string().min(2).max(100),
    },
  }),
  createUserController.handle,
);

adminsRouter.get(
  '/users/list-all',
  ensureAuthenticated,
  ensureSubAdministrator,
  listAllUsersController.handle,
);

export { adminsRouter };
