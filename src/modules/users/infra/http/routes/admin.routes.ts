import { Router } from 'express';
import { CreateUserByAdminController } from '../controllers/CreateUserByAdminController';
import { ListAllUsersController } from '../controllers/ListAllUsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const adminRouter = Router();

const createUserByAdminController = new CreateUserByAdminController();
const listAllUsersController = new ListAllUsersController();

adminRouter.post('/users', ensureAuthenticated, createUserByAdminController.handle);

adminRouter.get('/list-all-users', ensureAuthenticated, listAllUsersController.handle);

export { adminRouter };