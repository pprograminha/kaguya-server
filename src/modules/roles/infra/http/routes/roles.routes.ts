import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ListAllRolesController } from '../controllers/list-all-roles-controller';

const rolesRouter = Router();

const listAllRolesController = new ListAllRolesController();

rolesRouter.get(
  '/list-all',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      skip: Joi.number(),
      take: Joi.number(),
      order: Joi.string().regex(/(asc|desc)/),
    },
  }),
  listAllRolesController.handle,
);

export { rolesRouter };
