import { InMemoryBlocksRepository } from '@modules/blocks/__tests__/in-memory/in-memory-blocks-repository';
import { CreateClassService } from '@modules/classes/services/create-class-service';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { InMemoryClassesRepository } from '../in-memory/in-memory-classes-repository';
import { InMemoryUserClassesRepository } from '../in-memory/in-memory-user-classes-repository';

let inMemoryClassesRepository: InMemoryClassesRepository;
let inMemoryBlocksRepository: InMemoryBlocksRepository;
let fakeUsersRepository: FakeUsersRepository;
let inMemoryUserClassesRepository: InMemoryUserClassesRepository;
let createClass: CreateClassService;

describe('CreateClass', () => {
  beforeEach(() => {
    inMemoryClassesRepository = new InMemoryClassesRepository();
    inMemoryUserClassesRepository = new InMemoryUserClassesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    inMemoryBlocksRepository = new InMemoryBlocksRepository();

    createClass = new CreateClassService(
      inMemoryClassesRepository,
      inMemoryUserClassesRepository,
      fakeUsersRepository,
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
