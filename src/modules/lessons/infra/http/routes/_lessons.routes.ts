import { slugRegEx } from '@config/reg-ex';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensure-sub-administrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreateLessonController } from '../controllers/create-lesson-controller';
import { DeleteLessonController } from '../controllers/delete-lesson-controller';

const _lessonsRouter = Router();

const createLessonController = new CreateLessonController();
const deleteLessonController = new DeleteLessonController();

_lessonsRouter.post(
  '/lessons',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.BODY]: {
      link: Joi.string().required(),
      name: Joi.string().max(100).required(),
      slug: Joi.string().regex(slugRegEx).max(100).required(),
      description: Joi.string().max(1000).required(),
      block_id: Joi.string().uuid().required(),
    },
  }),
  createLessonController.handle,
);

_lessonsRouter.delete(
  '/lessons',
  ensureAuthenticated,
  ensureSubAdministrator,
  celebrate({
    [Segments.QUERY]: {
      lesson_id: Joi.string().uuid().required(),
    },
  }),
  deleteLessonController.handle,
);

export { _lessonsRouter };
