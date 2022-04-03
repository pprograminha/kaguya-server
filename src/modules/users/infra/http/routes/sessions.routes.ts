import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/authenticate-user-controller';

const sessionsRouter = Router();

const authenticadeUserController = new AuthenticateUserController();

sessionsRouter.post('/', authenticadeUserController.handle);

export { sessionsRouter };
