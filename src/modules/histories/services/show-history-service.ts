import { IBlocksRepository } from '@modules/blocks/domain/repositories/blocks-repository';
import { ILessonsRepository } from '@modules/lessons/domain/repositories/lessons-repository';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/playlists-repository';
import { ITrailsRepository } from '@modules/trails/domain/repositories/trails-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { Maybe } from '@shared/types/app';
import { IHistory } from '../domain/entities/ihistory';
import { IHistoriesRepository } from '../domain/repositories/histories-repository';
import { ShowHistoryRequestDTO } from '../dtos/show-history-request-dto';
import { History } from '../entities/history';
import { CreateHistoryService } from './create-history-service';

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

  async execute({
    user_id,
    history_id,
  }: ShowHistoryRequestDTO): Promise<IHistory> {
    let history: Maybe<
      IHistory & {
        auto_generated: boolean;
        redirect: string;
      }
    >;

    if (history_id) {
      const _history = await this.historiesRepository.findById(history_id);

      if (_history) {
        history = {
          ..._history,
          redirect: await this.getRedirect(_history.lesson_id),
          auto_generated: false,
        };
      }
    } else {
      const _history = await this.historiesRepository.findLatestHistory(
        user_id,
      );

      if (_history) {
        history = {
          ..._history,
          redirect: await this.getRedirect(_history.lesson_id),
          auto_generated: false,
        };
      }
    }

    if (!history) {
      const lesson = await this.lessonsRepository.findLessonWithMostViews();

      if (!lesson) {
        throw new AppError('Conflict with the lessons', 84, 409);
      }

      const _history = new History({
        lesson_id: lesson.id,
        user_id,
        recent_at: new Date(),
        updated_at: new Date(),
        created_at: new Date(),
      });

      history = {
        id: _history.id,
        lesson_id: _history.lesson_id,
        user_id: _history.user_id,
        created_at: _history.created_at,
        updated_at: _history.updated_at,
        recent_at: _history.recent_at,
        redirect: await this.getRedirect(_history.lesson_id),
        auto_generated: true,
      } as unknown as Maybe<IHistory> & {
        auto_generated: boolean;
        redirect: string;
      };
    }

    return history;
  }
}
