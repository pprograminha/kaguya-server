import { UpdateUserBlockProgressPorcentageService } from '@modules/blocks/services/update-user-block-progress-porcentage-service';
import { CreateHistoryService } from '@modules/histories/services/create-history-service';
import { RefreshUserLessonProgressService } from '@modules/lessons/services/refresh-user-lesson-progress-service';
import { CreateUserPlaylistsService } from '@modules/playlists/services/create-user-playlists-service';
import { UpdateUserPlaylistProgressPorcentageService } from '@modules/playlists/services/update-user-playlist-progress-porcentage-service';
import { UpdateUserTrailProgressPorcentageService } from '@modules/trails/services/update-user-trail-progress-porcentage-service';
import { container, delay } from 'tsyringe';

container.registerSingleton(
  'CreateUserPlaylistsService',
  delay(() => CreateUserPlaylistsService),
);

container.registerSingleton(
  'CreateHistoryService',
  delay(() => CreateHistoryService),
);

container.registerSingleton(
  'UpdateUserBlockProgressPorcentageService',
  delay(() => UpdateUserBlockProgressPorcentageService),
);

container.registerSingleton(
  'UpdateUserPlaylistProgressPorcentageService',
  delay(() => UpdateUserPlaylistProgressPorcentageService),
);

container.registerSingleton(
  'UpdateUserTrailProgressPorcentageService',
  delay(() => UpdateUserTrailProgressPorcentageService),
);

container.registerSingleton(
  'RefreshUserLessonProgressService',
  delay(() => RefreshUserLessonProgressService),
);
