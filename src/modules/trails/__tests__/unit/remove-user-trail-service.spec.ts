import { RemoveUserTrailService } from '@modules/trails/services/remove-user-trail-service';
import { AppError } from '@shared/errors/app-error';
import { InMemoryUserPlaylistsRepository } from '@modules/playlists/__tests__/in-memory/in-memory-user-playlists-repository';

import { InMemoryUserLessonsRepository } from '@modules/lessons/__tests__/in-memory/in-memory-user-lessons-repository';
import { InMemoryUserBlocksRepository } from '@modules/blocks/__tests__/in-memory/in-memory-user-blocks-repository';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { InMemoryUserTrailsRepository } from '../in-memory/in-memory-user-trails-repository';
import { InMemoryTrailsRepository } from '../in-memory/in-memory-trails-repository';

let inMemoryUserTrailsRepository: InMemoryUserTrailsRepository;
let inMemoryUserPlaylistsRepository: InMemoryUserPlaylistsRepository;
let inMemoryUserBlocksRepository: InMemoryUserBlocksRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserLessonsRepository: InMemoryUserLessonsRepository;
let inMemoryTrailsRepository: InMemoryTrailsRepository;

let removeUserTrail: RemoveUserTrailService;

describe('RemoveUserTrail', () => {
  beforeEach(() => {
    inMemoryUserTrailsRepository = new InMemoryUserTrailsRepository();
    inMemoryUserPlaylistsRepository = new InMemoryUserPlaylistsRepository();
    inMemoryTrailsRepository = new InMemoryTrailsRepository();
    inMemoryUserBlocksRepository = new InMemoryUserBlocksRepository();
    inMemoryUserLessonsRepository = new InMemoryUserLessonsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();

    removeUserTrail = new RemoveUserTrailService(
      inMemoryUserTrailsRepository,
      inMemoryUserPlaylistsRepository,
      inMemoryTrailsRepository,
      inMemoryUserBlocksRepository,
      inMemoryUserLessonsRepository,
      inMemoryUsersRepository,
    );
  });

  it('should be able to delete a user trail', async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    const trail = await inMemoryTrailsRepository.create({
      name: 'xxxxxxxxx',
      description: 'xxxxxx',
    });

    const userTrail = await inMemoryUserTrailsRepository.create({
      trail_id: trail.id,
      user_id: user.id,
    });

    const removeById = jest.spyOn(inMemoryUserTrailsRepository, 'removeById');

    await removeUserTrail.execute({
      user_id: user.id,
      trail_id: trail.id,
    });

    expect(removeById).toHaveBeenCalledWith(userTrail.id);
  });

  it('should not be able to delete a user trail with non-existing user', async () => {
    const trail = await inMemoryTrailsRepository.create({
      description: 'Xxxx',
      name: 'Xxxx',
    });

    await expect(
      removeUserTrail.execute({
        user_id: 'non-existing-user',
        trail_id: trail.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a user trail with non-existing user trail', async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    const trail = await inMemoryTrailsRepository.create({
      description: 'Xxxx',
      name: 'Xxxx',
    });

    await expect(
      removeUserTrail.execute({
        user_id: user.id,
        trail_id: trail.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
