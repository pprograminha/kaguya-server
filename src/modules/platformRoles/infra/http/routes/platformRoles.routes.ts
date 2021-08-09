import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import { PlatformRoleController } from '../controllers/PlatformRoleController';

const platformRolesRouter = Router();

const platformRoleController = new PlatformRoleController();

platformRolesRouter.post('/', ensureAuthenticated, platformRoleController.create);
platformRolesRouter.get('/list-all', ensureAuthenticated, platformRoleController.index);

export { platformRolesRouter };
