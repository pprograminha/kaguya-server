import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ListAllTrailsController } from '../controllers/ListAllTrailsController';
import { ShowTrailController } from '../controllers/ShowTrailController';

const trailsRouter = Router();

const listAllTrailsController = new ListAllTrailsController();
const showTrailController = new ShowTrailController();

trailsRouter.get(
  '/list-all',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      skip: Joi.number(),
      take: Joi.number(),
      order: Joi.string().regex(/(asc|desc)/),
      exclude_my_trails: Joi.boolean(),
    },
  }),
  listAllTrailsController.handle,
);

trailsRouter.get(
  '/show',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      trail_id: Joi.string().uuid().required(),
    },
  }),
  showTrailController.handle,
);

export { trailsRouter };
