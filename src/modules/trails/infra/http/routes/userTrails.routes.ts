import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreateUserTrailController } from '../controllers/CreateUserTrailController';
import { ListAllUserTrailsFromUserController } from '../controllers/ListAllUserTrailsFromUserController';
import { RemoveUserTrailController } from '../controllers/RemoveUserTrailController';

const userTrailsRouter = Router();

const createUserTrailController = new CreateUserTrailController();
const removeUserTrailController = new RemoveUserTrailController();
const listAllUserTrailsFromUserController =
  new ListAllUserTrailsFromUserController();

userTrailsRouter.use(ensureAuthenticated);

userTrailsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      trail_id: Joi.string().uuid().required(),
    },
  }),
  createUserTrailController.handle,
);

userTrailsRouter.get(
  '/list-all',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid(),
    },
  }),
  listAllUserTrailsFromUserController.handle,
);

userTrailsRouter.delete(
  '/',
  celebrate({
    [Segments.QUERY]: {
      user_trail_id: Joi.string().uuid().required(),
    },
  }),
  removeUserTrailController.handle,
);

export { userTrailsRouter };
