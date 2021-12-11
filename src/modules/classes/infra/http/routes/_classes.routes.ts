import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensureSubAdministrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreateClassController } from '../controllers/CreateClassController';
import { DeleteClassController } from '../controllers/DeleteClassController';

const _classesRouter = Router();

const createClassController = new CreateClassController();
const deleteClassController = new DeleteClassController();

_classesRouter.post(
  '/classes',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.BODY]: {
      link: Joi.string()
        .regex(
          /^https:\/\/www\.+([A-Za-z]{3,60})+([.com]?)+([/]?)+(([a-zA-Z0-9?!@#$%^&*)(+=._-]{3,60})?)+$/,
        )
        .required(),
      name: Joi.string().max(100).required(),
      description: Joi.string().max(255).required(),
      block_id: Joi.string().uuid().required(),
    },
  }),
  createClassController.handle,
);

_classesRouter.delete(
  '/classes',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.QUERY]: {
      class_id: Joi.string().uuid().required(),
    },
  }),
  deleteClassController.handle,
);

export { _classesRouter };
