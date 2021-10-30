import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ShowUserProfileController } from '../controllers/ShowUserProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();

const showUserProfileController = new ShowUserProfileController();

profileRouter.get(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      username: Joi.string().min(2).max(100).required(),
    },
  }),
  showUserProfileController.handle,
);

export { profileRouter };
