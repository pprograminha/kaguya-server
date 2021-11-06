import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensureSubAdministrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ShowClassController } from '../controllers/ShowClassController';

const showClassController = new ShowClassController();

const classesRouter = Router();

classesRouter.get(
  '/classes/show',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.QUERY]: {
      class_id: Joi.string().uuid().required(),
    },
  }),
  showClassController.handle,
);

export { classesRouter };
