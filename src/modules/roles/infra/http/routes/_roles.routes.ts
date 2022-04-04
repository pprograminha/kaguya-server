import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensure-sub-administrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreateRoleController } from '../controllers/create-role-controller';

const _rolesRouter = Router();

const createRoleController = new CreateRoleController();

_rolesRouter.post(
  '/roles',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.BODY]: {
      permission: Joi.number().required(),
      role: Joi.string().min(2).max(100),
    },
  }),
  createRoleController.handle,
);

export { _rolesRouter };
