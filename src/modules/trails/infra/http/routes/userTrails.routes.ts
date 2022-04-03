import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ChangeUserTrailEnabledFieldController } from '../controllers/change-user-trail-enabled-field-controller';
import { CreateUserTrailController } from '../controllers/CreateUserTrailController';
import { ListAllUserTrailsFromUserController } from '../controllers/ListAllUserTrailsFromUserController';
import { RemoveUserTrailController } from '../controllers/RemoveUserTrailController';

const userTrailsRouter = Router();

const createUserTrailController = new CreateUserTrailController();
const removeUserTrailController = new RemoveUserTrailController();
const listAllUserTrailsFromUserController =
  new ListAllUserTrailsFromUserController();
const changeUserTrailEnabledFieldController =
  new ChangeUserTrailEnabledFieldController();

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

userTrailsRouter.patch(
  '/change-enabled',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      trail_id: Joi.string().uuid().required(),
    },
  }),
  changeUserTrailEnabledFieldController.handle,
);

userTrailsRouter.get(
  '/list-all',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid(),
      user: Joi.boolean(),
    },
  }),
  listAllUserTrailsFromUserController.handle,
);

userTrailsRouter.delete(
  '/',
  celebrate({
    [Segments.QUERY]: {
      trail_id: Joi.string().uuid().required(),
    },
  }),
  removeUserTrailController.handle,
);

export { userTrailsRouter };
