import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ChangeCompleteUserClassController } from '../controllers/ChangeCompleteUserClassController';
import { ListClassesController } from '../controllers/ListClassesService';
import { ShowClassController } from '../controllers/ShowClassController';

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
      block_id: Joi.string().uuid(),
      name: Joi.string(),
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
