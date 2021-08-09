import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post('/',ensureAuthenticated, createUserController.handle);

export { usersRouter };
