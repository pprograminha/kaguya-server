import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import { adaptRoute } from '@core/infra/http/adapters/express-route-adapter';
import { AuthenticateUserController } from '../controllers/authenticate-user-controller';
import { makeAuthenticateUserByProviderControllerFactory } from '../../factories/make-authenticate-user-by-provider-controller-factory';

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
sessionsRouter.post(
  '/auth-provider',
  celebrate({
    [Segments.BODY]: {
      access_token: Joi.string().required(),
    },
  }),
  adaptRoute(makeAuthenticateUserByProviderControllerFactory()),
);

export { sessionsRouter };
