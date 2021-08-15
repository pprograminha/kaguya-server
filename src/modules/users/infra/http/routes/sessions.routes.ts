import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';

const sessionsRouter = Router();

const authenticadeUserController = new AuthenticateUserController();

sessionsRouter.post('/', authenticadeUserController.handle);

export { sessionsRouter };
