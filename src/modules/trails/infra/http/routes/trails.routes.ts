import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import { ListAllTrailsController } from '../controllers/ListAllTrailsController';

const trailsRouter = Router();

const listAllTrailsController = new ListAllTrailsController();

trailsRouter.get(
  '/list-all',
  ensureAuthenticated,
  listAllTrailsController.handle,
);

export { trailsRouter };
