import { UpdateUserBlockProgressPorcentageService } from '@modules/blocks/services/update-user-block-progress-porcentage-service';
import { InMemoryBlocksRepository } from '@modules/blocks/__tests__/in-memory/in-memory-blocks-repository';
import { InMemoryUserBlocksRepository } from '@modules/blocks/__tests__/in-memory/in-memory-user-blocks-repository';
import { CreateLessonService } from '@modules/lessons/services/create-lesson-service';
import { RefreshUserLessonProgressService } from '@modules/lessons/services/refresh-user-lesson-progress-service';
import { UpdateUserPlaylistProgressPorcentageService } from '@modules/playlists/services/update-user-playlist-progress-porcentage-service';
import { InMemoryUserPlaylistsRepository } from '@modules/playlists/__tests__/in-memory/in-memory-user-playlists-repository';
import { UpdateUserTrailProgressPorcentageService } from '@modules/trails/services/update-user-trail-progress-porcentage-service';
import { InMemoryUserTrailsRepository } from '@modules/trails/__tests__/in-memory/in-memory-user-trails-repository';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { AppError } from '@shared/errors/app-error';
import { InMemoryLessonsRepository } from '../in-memory/in-memory-lessons-repository';
import { InMemoryUserLessonsRepository } from '../in-memory/in-memory-user-lessons-repository';

let inMemoryLessonsRepository: InMemoryLessonsRepository;
let inMemoryBlocksRepository: InMemoryBlocksRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserBlocksRepository: InMemoryUserBlocksRepository;
let inMemoryUserLessonsRepository: InMemoryUserLessonsRepository;
let inMemoryUserPlaylistsRepository: InMemoryUserPlaylistsRepository;
let inMemoryUserTrailsRepository: InMemoryUserTrailsRepository;
let refreshUserLessonProgressService: RefreshUserLessonProgressService;
let updateUserBlockProgressPorcentageService: UpdateUserBlockProgressPorcentageService;
let updateUserPlaylistProgressPorcentageService: UpdateUserPlaylistProgressPorcentageService;
let updateUserTrailProgressPorcentageService: UpdateUserTrailProgressPorcentageService;
let createLesson: CreateLessonService;

describe('CreateLesson', () => {
  beforeEach(() => {
    inMemoryLessonsRepository = new InMemoryLessonsRepository();
    inMemoryUserLessonsRepository = new InMemoryUserLessonsRepository();
    inMemoryUserTrailsRepository = new InMemoryUserTrailsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryBlocksRepository = new InMemoryBlocksRepository();
    inMemoryUserPlaylistsRepository = new InMemoryUserPlaylistsRepository();
    inMemoryUserBlocksRepository = new InMemoryUserBlocksRepository();
    updateUserPlaylistProgressPorcentageService =
      new UpdateUserPlaylistProgressPorcentageService(
        inMemoryUserBlocksRepository,
        inMemoryUserPlaylistsRepository,
      );
    updateUserBlockProgressPorcentageService =
      new UpdateUserBlockProgressPorcentageService(
        inMemoryUserBlocksRepository,
        inMemoryUserLessonsRepository,
      );
    updateUserTrailProgressPorcentageService =
      new UpdateUserTrailProgressPorcentageService(
        inMemoryUserTrailsRepository,
        inMemoryUserPlaylistsRepository,
      );

    refreshUserLessonProgressService = new RefreshUserLessonProgressService(
      updateUserBlockProgressPorcentageService,
      updateUserPlaylistProgressPorcentageService,
      updateUserTrailProgressPorcentageService,
    );

    createLesson = new CreateLessonService(
      inMemoryLessonsRepository,
      inMemoryUserLessonsRepository,
      inMemoryUsersRepository,
      inMemoryBlocksRepository,
      refreshUserLessonProgressService,
    );
  });

  it('should be able to create lesson', async () => {
    const block = await inMemoryBlocksRepository.create({
      name: 'xxxxx',
      slug: 'xxxxx',
      playlist_id: 'playlist.id',
    });

    const lessonCreated = await createLesson.execute({
      block_id: block.id,
      description: 'xxxx xxx xx',
      link: 'xxx://xxxxx.xxx.xx',
      slug: 'xxxx',
      name: 'Xxxx',
    });

    expect(lessonCreated).toHaveProperty('id');
    expect(lessonCreated.name).toBe('Xxxx');
    expect(lessonCreated.link).toBe('xxx://xxxxx.xxx.xx');
  });

  it('should not be able to create lesson with non-existing block', async () => {
    await expect(
      createLesson.execute({
        block_id: 'non-existent-block',
        description: 'xxxx xxx xx',
        link: 'xxx://xxxxx.xxx.xx',
        slug: 'xxxx',
        name: 'Xxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
