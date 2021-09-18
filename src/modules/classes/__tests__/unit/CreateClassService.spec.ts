import { FakeBlocksRepository } from '@modules/blocks/__tests__/fakes/FakeBlocksRepository';
import { CreateClassService } from '@modules/classes/services/CreateClassService';
import { AppError } from '@shared/errors/AppError';
import { FakeClassesRepository } from '../fakes/FakeClassesRepository';

let fakeClassesRepository: FakeClassesRepository;
let fakeBlocksRepository: FakeBlocksRepository;
let createClass: CreateClassService;

describe('CreateClass', () => {
  beforeEach(() => {
    fakeClassesRepository = new FakeClassesRepository();
    fakeBlocksRepository = new FakeBlocksRepository();

    createClass = new CreateClassService(
      fakeClassesRepository,
      fakeBlocksRepository,
    );
  });

  it('should be able to create class', async () => {
    const block = await fakeBlocksRepository.create({
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
