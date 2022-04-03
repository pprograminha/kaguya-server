import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ChangeCompleteUserClassController } from '../controllers/change-complete-user-class-controller';
import { ListClassesController } from '../controllers/list-classes-service';
import { ShowClassController } from '../controllers/show-class-controller';

const showClassController = new ShowClassController();
const listClassesController = new ListClassesController();
const changeCompleteUserClassController =
  new ChangeCompleteUserClassController();

const classesRouter = Router();

classesRouter.get(
  '/show',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      class_id: Joi.string().uuid(),
      block_slug: Joi.string(),
      class_slug: Joi.string(),
    },
  }),
  showClassController.handle,
);
classesRouter.get(
  '/list',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      block_id: Joi.string().uuid(),
    },
  }),
  listClassesController.handle,
);

classesRouter.post(
  '/change-complete-class',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      class_id: Joi.string().uuid().required(),
    },
  }),
  changeCompleteUserClassController.handle,
);

export { classesRouter };
