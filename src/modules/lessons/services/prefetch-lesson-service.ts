import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { IBlocksRepository } from '@modules/blocks/domain/repositories/blocks-repository';
import { IPlaylist } from '@modules/playlists/domain/entities/iplaylist';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/playlists-repository';
import { ITrail } from '@modules/trails/domain/entities/itrail';
import { ITrailsRepository } from '@modules/trails/domain/repositories/trails-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { Maybe } from '@shared/types/app';
import { ILesson } from '../domain/entities/ilesson';
import { ILessonsRepository } from '../domain/repositories/lessons-repository';

type Blocks = (IBlock & { lessons: ILesson[] })[];

type PrefetchLessonRequestResponse = {
  blocks: Blocks;
  trail: Omit<ITrail, 'playlists'> & {
    playlists: Maybe;
  };
  playlist: IPlaylist;
};

type PrefetchLessonRequestDTO = {
  playlist_slug: string;
  trail_slug: string;
};

@injectable()
class PrefetchLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,

    @inject('BlocksRepository')
    private blocksRepository: IBlocksRepository,

    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,
  ) {}

  async execute({
    playlist_slug,
    trail_slug,
  }: PrefetchLessonRequestDTO): Promise<PrefetchLessonRequestResponse> {
    const playlist = await this.playlistsRepository.findBySlug({
      slug: playlist_slug,
      trail_slug,
    });

    if (!playlist) {
      throw new AppError('Playlist does not exist', 6, 401);
    }

    const trail = await this.trailsRepository.findBySlug(trail_slug);

    if (!trail) {
      throw new AppError('Trail does not exist', 7, 401);
    }

    let blocks: Blocks = await this.blocksRepository.findAllBlocksFromPlaylist({
      playlist_id: playlist.id,
    });

    blocks = await Promise.all(
      blocks.map(async block => {
        const lessons = await this.lessonsRepository.findAllLessonsFromBlock({
          block_id: block.id,
        });
        return { ...block, lessons };
      }),
    );

    return {
      trail: {
        ...trail,
        playlists: null,
      },
      playlist,
      blocks,
    };
  }
}

export { PrefetchLessonService };
