import { Router } from 'express';
import { PlatformRoleController } from '../controllers/PlatformRoleController';

const platformRolesRouter = Router();

const platformRoleController = new PlatformRoleController();

platformRolesRouter.post('/', platformRoleController.create);

export { platformRolesRouter };
