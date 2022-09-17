import { slugRegEx } from '@config/reg-ex';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ListAllTrailsController } from '../controllers/list-all-trails-controller';
import { ShowTrailController } from '../controllers/show-trail-controller';

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
      trail_id: Joi.string().uuid(),
      slug: Joi.string().regex(slugRegEx),
    },
  }),
  showTrailController.handle,
);

export { trailsRouter };
