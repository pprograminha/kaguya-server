import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ChangeCompleteUserLessonController } from '../controllers/change-complete-user-lesson-controller';
import { ListLessonsController } from '../controllers/list-lessons-service';
import { ShowLessonController } from '../controllers/show-lesson-controller';

const showLessonController = new ShowLessonController();
const listLessonsController = new ListLessonsController();
const changeCompleteUserLessonController =
  new ChangeCompleteUserLessonController();

const lessonsRouter = Router();

lessonsRouter.get(
  '/show',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      lesson_id: Joi.string().uuid(),
      block_slug: Joi.string(),
      lesson_slug: Joi.string(),
    },
  }),
  showLessonController.handle,
);

lessonsRouter.get(
  '/list',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      skip: Joi.number(),
      take: Joi.number(),
      order: Joi.string()
        .regex(/(asc|desc)/)
        .trim(),
      block_id: Joi.string().uuid(),
    },
  }),
  listLessonsController.handle,
);

lessonsRouter.post(
  '/change-complete-lesson',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      lesson_id: Joi.string().uuid().required(),
    },
  }),
  changeCompleteUserLessonController.handle,
);

export { lessonsRouter };
