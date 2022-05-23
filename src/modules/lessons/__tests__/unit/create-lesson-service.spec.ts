import { InMemoryBlocksRepository } from '@modules/blocks/__tests__/in-memory/in-memory-blocks-repository';
import { CreateLessonService } from '@modules/lessons/services/create-lesson-service';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { AppError } from '@shared/errors/app-error';
import { InMemoryLessonsRepository } from '../in-memory/in-memory-lessons-repository';
import { InMemoryUserLessonsRepository } from '../in-memory/in-memory-user-lessons-repository';

let inMemoryLessonsRepository: InMemoryLessonsRepository;
let inMemoryBlocksRepository: InMemoryBlocksRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserLessonsRepository: InMemoryUserLessonsRepository;
let createLesson: CreateLessonService;

describe('CreateLesson', () => {
  beforeEach(() => {
    inMemoryLessonsRepository = new InMemoryLessonsRepository();
    inMemoryUserLessonsRepository = new InMemoryUserLessonsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryBlocksRepository = new InMemoryBlocksRepository();

    createLesson = new CreateLessonService(
      inMemoryLessonsRepository,
      inMemoryUserLessonsRepository,
      inMemoryUsersRepository,
      inMemoryBlocksRepository,
    );
  });

  it('should be able to create lesson', async () => {
    const block = await inMemoryBlocksRepository.create({
      name: 'xxxxx',
      playlist_id: 'playlist.id',
    });

    const lessonCreated = await createLesson.execute({
      block_id: block.id,
      description: 'xxxx xxx xx',
      link: 'xxx://xxxxx.xxx.xx',
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
        name: 'Xxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
