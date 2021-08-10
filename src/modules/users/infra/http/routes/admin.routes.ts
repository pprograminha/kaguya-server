import { Router } from 'express';
import { CreateUserByAdminController } from '../controllers/CreateUserByAdminController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const adminRouter = Router();

const createUserByAdminController = new CreateUserByAdminController();

adminRouter.post('/users', ensureAuthenticated, createUserByAdminController.handle);

export { adminRouter };