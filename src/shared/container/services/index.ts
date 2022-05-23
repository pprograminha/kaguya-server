import { CreateHistoryService } from '@modules/histories/services/create-history-service';
import { CreateUserPlaylistsService } from '@modules/playlists/services/create-user-playlists-service';
import { container, delay } from 'tsyringe';

container.registerSingleton(
  'CreateUserPlaylistsService',
  delay(() => CreateUserPlaylistsService),
);

container.registerSingleton(
  'CreateHistoryService',
  delay(() => CreateHistoryService),
);
