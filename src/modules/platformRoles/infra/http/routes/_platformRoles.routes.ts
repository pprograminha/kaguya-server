import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensureSubAdministrator';
import { Router } from 'express';
import { CreatePlatformRoleController } from '../controllers/CreatePlatformRoleController';

const _platformRolesRouter = Router();

const createPlatformRoleController = new CreatePlatformRoleController();

_platformRolesRouter.post(
  '/',
  ensureAuthenticated,
  ensureSubAdministrator,
  createPlatformRoleController.handle,
);

export { _platformRolesRouter };
