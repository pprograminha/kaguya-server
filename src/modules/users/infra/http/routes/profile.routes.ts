import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ShowUserProfileController } from '../controllers/show-user-profile-controller';
import ensureAuthenticated from '../middlewares/ensure-authenticated';

const profileRouter = Router();

const showUserProfileController = new ShowUserProfileController();

profileRouter.get(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      username: Joi.string().min(2).max(100),
    },
  }),
  showUserProfileController.handle,
);

export { profileRouter };
