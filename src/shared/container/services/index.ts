import { CreateUserPlaylistsService } from '@modules/playlists/services/CreateUserPlaylistsService';
import { container } from 'tsyringe';

container.registerInstance(
  'CreateUserPlaylistsService',
  CreateUserPlaylistsService,
);
