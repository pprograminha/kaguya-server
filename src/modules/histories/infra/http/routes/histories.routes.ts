import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreateHistoryController } from '../controllers/create-history-controller';
import { ListHistoriesController } from '../controllers/list-histories-controller';
import { ShowHistoryController } from '../controllers/show-history-controller';

const historiesRouter = Router();

const listHistoriesController = new ListHistoriesController();
const showHistoryController = new ShowHistoryController();
const createHistoryController = new CreateHistoryController();

historiesRouter.get(
  '/list',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid(),
    },
  }),
  listHistoriesController.handle,
);

historiesRouter.get(
  '/show',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      history_id: Joi.string().uuid(),
    },
  }),
  showHistoryController.handle,
);

historiesRouter.post(
  '/create',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      class_id: Joi.string().uuid().required(),
    },
  }),
  createHistoryController.handle,
);

export { historiesRouter };
