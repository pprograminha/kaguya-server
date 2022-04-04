import { CreateUserPlaylistsService } from '@modules/playlists/services/create-user-playlists-service';
import { container, delay } from 'tsyringe';

container.registerSingleton(
  'CreateUserPlaylistsService',
  delay(() => CreateUserPlaylistsService),
);
