import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import { ListAllRolesController } from '../controllers/ListAllRolesController';

const rolesRouter = Router();

const listAllRolesController = new ListAllRolesController();

rolesRouter.get(
  '/list-all',
  ensureAuthenticated,
  listAllRolesController.handle,
);

export { rolesRouter };
