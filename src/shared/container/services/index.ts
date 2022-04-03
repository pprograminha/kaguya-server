import { CreateUserPlaylistsService } from '@modules/playlists/services/CreateUserPlaylistsService';
import { container, delay } from 'tsyringe';

container.registerSingleton(
  'CreateUserPlaylistsService',
  delay(() => CreateUserPlaylistsService),
);
