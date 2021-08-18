import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensureSubAdministrator';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import { CreatePlatformRoleController } from '../controllers/CreatePlatformRoleController';
import { ListAllPlatformRolesController } from '../controllers/ListAllPlatformRolesController';

const platformRolesRouter = Router();

const createPlatformRoleController = new CreatePlatformRoleController();
const listAllPlatformRolesController = new ListAllPlatformRolesController();

platformRolesRouter.post(
  '/',
  ensureAuthenticated,
  ensureSubAdministrator,
  createPlatformRoleController.handle,
);
platformRolesRouter.get(
  '/list-all',
  ensureAuthenticated,
  listAllPlatformRolesController.handle,
);

export { platformRolesRouter };
