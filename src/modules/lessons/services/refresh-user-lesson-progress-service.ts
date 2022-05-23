import { UpdateUserBlockProgressPorcentageService } from '@modules/blocks/services/update-user-block-progress-porcentage-service';
import { UpdateUserPlaylistProgressPorcentageService } from '@modules/playlists/services/update-user-playlist-progress-porcentage-service';
import { UpdateUserTrailProgressPorcentageService } from '@modules/trails/services/update-user-trail-progress-porcentage-service';
import { inject, injectable } from 'tsyringe';
import { RefreshUserLessonProgressRequestDTO } from '../dtos/refresh-user-lesson-progress-request-dto';

@injectable()
class RefreshUserLessonProgressService {
  constructor(
    @inject('UpdateUserBlockProgressPorcentageService')
    private updateUserBlockProgressPorcentageService: UpdateUserBlockProgressPorcentageService,

    @inject('UpdateUserPlaylistProgressPorcentageService')
    private updateUserPlaylistProgressPorcentageService: UpdateUserPlaylistProgressPorcentageService,

    @inject('UpdateUserTrailProgressPorcentageService')
    private updateUserTrailProgressPorcentageService: UpdateUserTrailProgressPorcentageService,
  ) {}

  async execute({
    block_id,
    user_id,
  }: RefreshUserLessonProgressRequestDTO): Promise<void> {
    const userBlock =
      await this.updateUserBlockProgressPorcentageService.execute({
        user_id,
        block_id,
      });

    const userPlaylist =
      await this.updateUserPlaylistProgressPorcentageService.execute({
        user_id,
        playlist_id: userBlock.playlist_id,
      });

    await this.updateUserTrailProgressPorcentageService.execute({
      user_id,
      trail_id: userPlaylist.trail_id,
    });
  }
}

export { RefreshUserLessonProgressService };
