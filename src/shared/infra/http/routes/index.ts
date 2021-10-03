import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { platformRolesRouter } from '@modules/platformRoles/infra/http/routes/platformRoles.routes';
import { Router } from 'express';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { _usersRouter } from '@modules/users/infra/http/routes/_users.routes';
import { trailsRouter } from '@modules/trails/infra/http/routes/trails.routes';
import { userTrailsRouter } from '@modules/trails/infra/http/routes/userTrails.routes';
import { _trailsRouter } from '@modules/trails/infra/http/routes/_trails.routes';
import { _playlistsRouter } from '@modules/playlists/infra/http/routes/_playlists.routes';
import { userPlaylistsRouter } from '@modules/playlists/infra/http/routes/userPlaylists.routes';
import { _platformRolesRouter } from '@modules/platformRoles/infra/http/routes/_platformRoles.routes';
import { _blocksRouter } from '@modules/blocks/infra/http/routes/_blocks.routes';
import { _classesRouter } from '@modules/classes/infra/http/routes/_classes.routes';
import { playlistsRouter } from '@modules/playlists/infra/http/routes/playlists.routes';
import { blocksRouter } from '@modules/blocks/infra/http/routes/blocks.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sub-admins', [
  _usersRouter,
  _trailsRouter,
  _playlistsRouter,
  _platformRolesRouter,
  _blocksRouter,
  _classesRouter,
]);
router.use('/sessions', sessionsRouter);
router.use('/trails', trailsRouter);
router.use('/blocks', blocksRouter);
router.use('/playlists', playlistsRouter);
router.use('/user-trails', userTrailsRouter);
router.use('/user-playlists', userPlaylistsRouter);
router.use('/platform-roles', platformRolesRouter);

export { router };
