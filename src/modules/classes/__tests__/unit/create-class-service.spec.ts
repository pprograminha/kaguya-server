import { InMemoryBlocksRepository } from '@modules/blocks/__tests__/in-memory/in-memory-blocks-repository';
import { CreateClassService } from '@modules/classes/services/create-class-service';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { AppError } from '@shared/errors/app-error';
import { InMemoryClassesRepository } from '../in-memory/in-memory-classes-repository';
import { InMemoryUserClassesRepository } from '../in-memory/in-memory-user-classes-repository';

let inMemoryClassesRepository: InMemoryClassesRepository;
let inMemoryBlocksRepository: InMemoryBlocksRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserClassesRepository: InMemoryUserClassesRepository;
let createClass: CreateClassService;

describe('CreateClass', () => {
  beforeEach(() => {
    inMemoryClassesRepository = new InMemoryClassesRepository();
    inMemoryUserClassesRepository = new InMemoryUserClassesRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryBlocksRepository = new InMemoryBlocksRepository();

    createClass = new CreateClassService(
      inMemoryClassesRepository,
      inMemoryUserClassesRepository,
      inMemoryUsersRepository,
      inMemoryBlocksRepository,
    );
  });

  it('should be able to create class', async () => {
    const block = await inMemoryBlocksRepository.create({
      name: 'xxxxx',
      playlist_id: 'playlist.id',
    });

    const classCreated = await createClass.execute({
      block_id: block.id,
      description: 'xxxx xxx xx',
      link: 'xxx://xxxxx.xxx.xx',
      name: 'Xxxx',
    });

    expect(classCreated).toHaveProperty('id');
    expect(classCreated.name).toBe('Xxxx');
    expect(classCreated.link).toBe('xxx://xxxxx.xxx.xx');
  });

  it('should not be able to create class with non-existing block', async () => {
    await expect(
      createClass.execute({
        block_id: 'non-existent-block',
        description: 'xxxx xxx xx',
        link: 'xxx://xxxxx.xxx.xx',
        name: 'Xxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
