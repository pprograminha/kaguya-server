import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { platformRolesRouter } from '@modules/platformRoles/infra/http/routes/platformRoles.routes';
import { Router } from 'express';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { adminsRouter } from '@modules/users/infra/http/routes/admins.routes';
import { trailsRouter } from '@modules/trails/infra/http/routes/trails.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/admins', adminsRouter);
router.use('/sessions', sessionsRouter);
router.use('/trails', trailsRouter);
router.use('/platform-roles', platformRolesRouter);

export { router };
