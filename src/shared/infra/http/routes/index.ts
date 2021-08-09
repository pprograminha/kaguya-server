import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { platformRolesRouter } from '@modules/platformRoles/infra/http/routes/platformRoles.routes';
import { Router } from 'express';

const router = Router();

router.use('/users', usersRouter);
router.use('/platform/roles', platformRolesRouter);

export { router };
