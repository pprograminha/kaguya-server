import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import { ListAllPlatformRolesController } from '../controllers/ListAllPlatformRolesController';

const platformRolesRouter = Router();

const listAllPlatformRolesController = new ListAllPlatformRolesController();

platformRolesRouter.get(
  '/list-all',
  ensureAuthenticated,
  listAllPlatformRolesController.handle,
);

export { platformRolesRouter };
