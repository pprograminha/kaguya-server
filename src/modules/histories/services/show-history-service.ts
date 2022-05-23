import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { IBlocksRepository } from '@modules/blocks/domain/repositories/blocks-repository';
import { ILesson } from '@modules/lessons/domain/entities/ilesson';
import { ILessonsRepository } from '@modules/lessons/domain/repositories/lessons-repository';
import { IPlaylist } from '@modules/playlists/domain/entities/iplaylist';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/playlists-repository';
import { ITrail } from '@modules/trails/domain/entities/itrail';
import { ITrailsRepository } from '@modules/trails/domain/repositories/trails-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { IHistoriesRepository } from '../domain/repositories/histories-repository';
import { ShowHistoryRequestDTO } from '../dtos/show-history-request-dto';
import { History } from '../entities/history';
import { CreateHistoryService } from './create-history-service';

type CustomHistory = {
  id: string;
  redirect: string;
  auto_generated: boolean;
  lesson: {
    name: string;
  };
  playlist: {
    name: string;
  };
  trail: {
    avatar: string | null;
  };
};
@injectable()
export class ShowHistoryService {
  constructor(
    @inject('HistoriesRepository')
    private historiesRepository: IHistoriesRepository,

    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('BlocksRepository')
    private blocksRepository: IBlocksRepository,

    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,

    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,

    @inject('CreateHistoryService')
    private createHistoryService: CreateHistoryService,
  ) {}

  async getRedirect(lesson_id: string): Promise<string> {
    const lesson = await this.lessonsRepository.findById(lesson_id);

    if (!lesson) {
      throw new AppError('Conflict with the lessons', 80, 409);
    }

    const block = await this.blocksRepository.findById(lesson.block_id);

    if (!block) {
      throw new AppError('Conflict with the blocks', 81, 409);
    }

    const playlist = await this.playlistsRepository.findById(block.playlist_id);

    if (!playlist) {
      throw new AppError('Conflict with the playlists', 82, 409);
    }

    const trail = await this.trailsRepository.findById(playlist.trail_id);

    if (!trail) {
      throw new AppError('Conflict with the trails', 83, 409);
    }

    const redirect = `/trail/${trail.slug}/playlist/${playlist.slug}/block/${block.slug}/lesson/${lesson.slug}`;

    return redirect;
  }

  async getLessonParents(lesson_id: string): Promise<{
    lesson: ILesson;
    block: IBlock;
    trail: ITrail;
    playlist: IPlaylist;
  }> {
    const lesson = await this.lessonsRepository.findById(lesson_id);

    if (!lesson) {
      throw new AppError('Conflict with the lessons', 80.1, 409);
    }

    const block = await this.blocksRepository.findById(lesson.block_id);

    if (!block) {
      throw new AppError('Conflict with the blocks', 81.1, 409);
    }

    const playlist = await this.playlistsRepository.findById(block.playlist_id);

    if (!playlist) {
      throw new AppError('Conflict with the playlists', 82.1, 409);
    }

    const trail = await this.trailsRepository.findById(playlist.trail_id);

    if (!trail) {
      throw new AppError('Conflict with the trails', 83.1, 409);
    }

    return {
      lesson,
      block,
      playlist,
      trail,
    };
  }

  async execute({
    user_id,
    history_id,
  }: ShowHistoryRequestDTO): Promise<CustomHistory> {
    if (history_id) {
      const history = await this.historiesRepository.findById(history_id);

      if (history) {
        const { playlist, trail } = await this.getLessonParents(
          history.lesson_id,
        );

        return {
          id: history.id,
          lesson: {
            name: history.lesson.name,
          },
          playlist: {
            name: playlist.name,
          },
          trail: {
            avatar: trail.avatar,
          },
          redirect: await this.getRedirect(history.lesson_id),
          auto_generated: false,
        };
      }
    } else {
      const history = await this.historiesRepository.findLatestHistory(user_id);

      if (history) {
        const { playlist, trail } = await this.getLessonParents(
          history.lesson_id,
        );

        return {
          id: history.id,
          lesson: {
            name: history.lesson.name,
          },
          playlist: {
            name: playlist.name,
          },
          trail: {
            avatar: trail.avatar,
          },
          redirect: await this.getRedirect(history.lesson_id),
          auto_generated: false,
        };
      }
    }

    const lesson = await this.lessonsRepository.findLessonWithMostViews();

    if (!lesson) {
      throw new AppError('Conflict with the lessons', 84, 409);
    }

    const history = new History({
      lesson_id: lesson.id,
      user_id,
      recent_at: new Date(),
      updated_at: new Date(),
      created_at: new Date(),
    });

    const { playlist, trail } = await this.getLessonParents(history.lesson_id);

    return {
      id: history.id,
      lesson: {
        name: lesson.name,
      },
      playlist: {
        name: playlist.name,
      },
      trail: {
        avatar: trail.avatar,
      },
      redirect: await this.getRedirect(history.lesson_id),
      auto_generated: false,
    };
  }
}
