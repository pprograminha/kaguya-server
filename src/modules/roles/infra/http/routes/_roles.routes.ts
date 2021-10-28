import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensureSubAdministrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreateRoleController } from '../controllers/CreateRoleController';

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
