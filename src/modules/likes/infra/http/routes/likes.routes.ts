import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { MarkAsLikeOrDislikeController } from '../controllers/mark-as-like-or-dislike-controller';

const likesRouter = Router();

const markAsLikeOrDislikeController = new MarkAsLikeOrDislikeController();

likesRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      class_id: Joi.string().uuid().required(),
      state: Joi.string()
        .regex(/^(like|dislike|none)$/)
        .required(),
    },
  }),
  markAsLikeOrDislikeController.handle,
);

export { likesRouter };
