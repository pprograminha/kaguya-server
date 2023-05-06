import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import { AuthenticateUserController } from '../controllers/authenticate-user-controller';

const sessionsRouter = Router();

const authenticadeUserController = new AuthenticateUserController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authenticadeUserController.handle,
);

export { sessionsRouter };
