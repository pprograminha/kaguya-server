import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ChangeUserTrailEnabledFieldController } from '../controllers/change-user-trail-enabled-field-controller';
import { CreateUserTrailController } from '../controllers/create-user-trail-controller';
import { ListAllUserTrailsFromUserController } from '../controllers/list-all-user-trails-from-user-controller';
import { RemoveUserTrailController } from '../controllers/remove-user-trail-controller';

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
    [Segments.QUERY]: {
      user_id: Joi.string().uuid(),
      order: Joi.string().regex(/^(asc|desc)$/),
      skip: Joi.number(),
      take: Joi.number(),
      enabled: Joi.boolean().default(true),
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
