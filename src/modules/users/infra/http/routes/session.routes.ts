import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';

const sessionRouter = Router();

const authenticadeUserController = new AuthenticateUserController();

sessionRouter.post('/', authenticadeUserController.handle);

export { sessionRouter };