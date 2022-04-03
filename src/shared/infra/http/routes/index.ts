import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { rolesRouter } from '@modules/roles/infra/http/routes/roles.routes';
import { Router } from 'express';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { _usersRouter } from '@modules/users/infra/http/routes/_users.routes';
import { trailsRouter } from '@modules/trails/infra/http/routes/trails.routes';
import { userTrailsRouter } from '@modules/trails/infra/http/routes/userTrails.routes';
import { _trailsRouter } from '@modules/trails/infra/http/routes/_trails.routes';
import { _playlistsRouter } from '@modules/playlists/infra/http/routes/_playlists.routes';
import { userPlaylistsRouter } from '@modules/playlists/infra/http/routes/userPlaylists.routes';
import { _rolesRouter } from '@modules/roles/infra/http/routes/_roles.routes';
import { _blocksRouter } from '@modules/blocks/infra/http/routes/_blocks.routes';
import { _classesRouter } from '@modules/classes/infra/http/routes/_classes.routes';
import { playlistsRouter } from '@modules/playlists/infra/http/routes/playlists.routes';
import { blocksRouter } from '@modules/blocks/infra/http/routes/blocks.routes';
import { profileRouter } from '@modules/users/infra/http/routes/profile.routes';
import { classesRouter } from '@modules/classes/infra/http/routes/classes.routes';
import { likesRouter } from '@modules/likes/infra/http/routes/likes.routes';
import { historiesRouter } from '@modules/histories/infra/http/routes/histories.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/histories', historiesRouter);
router.use('/sub-admins', [
  _usersRouter,
  _trailsRouter,
  _playlistsRouter,
  _rolesRouter,
  _blocksRouter,
  _classesRouter,
]);
router.use('/sessions', sessionsRouter);
router.use('/likes', likesRouter);
router.use('/classes', classesRouter);
router.use('/trails', trailsRouter);
router.use('/blocks', blocksRouter);
router.use('/playlists', playlistsRouter);
router.use('/user-trails', userTrailsRouter);
router.use('/user-playlists', userPlaylistsRouter);
router.use('/roles', rolesRouter);
router.use('/profile', profileRouter);

export { router };
