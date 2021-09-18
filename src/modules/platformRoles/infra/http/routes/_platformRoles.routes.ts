import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensureSubAdministrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreatePlatformRoleController } from '../controllers/CreatePlatformRoleController';

const _platformRolesRouter = Router();

const createPlatformRoleController = new CreatePlatformRoleController();

_platformRolesRouter.post(
  '/platform-roles',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.BODY]: {
      permission: Joi.number().required(),
      role: Joi.string().min(2).max(100),
    },
  }),
  createPlatformRoleController.handle,
);

export { _platformRolesRouter };
