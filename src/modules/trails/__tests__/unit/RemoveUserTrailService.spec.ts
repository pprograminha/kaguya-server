import { FakeTrailsRepository } from '@modules/trails/__tests__/fakes/FakeTrailsRepository';
import { RemoveUserTrailService } from '@modules/trails/services/RemoveUserTrailService';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { InMemoryUserPlaylistsRepository } from '@modules/playlists/__tests__/in-memory/in-memory-user-playlists-repository';

import { InMemoryUserClassesRepository } from '@modules/classes/__tests__/in-memory/in-memory-user-classes-repository';
import { InMemoryUserBlocksRepository } from '@modules/blocks/__tests__/in-memory/in-memory-user-blocks-repository';
import { FakeUserTrailsRepository } from '../fakes/FakeUserTrailsRepository';

let fakeUserTrailsRepository: FakeUserTrailsRepository;
let inMemoryUserPlaylistsRepository: InMemoryUserPlaylistsRepository;
let inMemoryUserBlocksRepository: InMemoryUserBlocksRepository;
let fakeUsersRepository: FakeUsersRepository;
let inMemoryUserClassesRepository: InMemoryUserClassesRepository;
let fakeTrailsRepository: FakeTrailsRepository;

let removeUserTrail: RemoveUserTrailService;

describe('RemoveUserTrail', () => {
  beforeEach(() => {
    fakeUserTrailsRepository = new FakeUserTrailsRepository();
    inMemoryUserPlaylistsRepository = new InMemoryUserPlaylistsRepository();
    fakeTrailsRepository = new FakeTrailsRepository();
    inMemoryUserBlocksRepository = new InMemoryUserBlocksRepository();
    inMemoryUserClassesRepository = new InMemoryUserClassesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    removeUserTrail = new RemoveUserTrailService(
      fakeUserTrailsRepository,
      inMemoryUserPlaylistsRepository,
      fakeTrailsRepository,
      inMemoryUserBlocksRepository,
      inMemoryUserClassesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to delete a user trail', async () => {
    const user = await fakeUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    const trail = await fakeTrailsRepository.create({
      name: 'xxxxxxxxx',
      description: 'xxxxxx',
    });

    const userTrail = await fakeUserTrailsRepository.create({
      trail_id: trail.id,
      user_id: user.id,
    });

    const removeById = jest.spyOn(fakeUserTrailsRepository, 'removeById');

    await removeUserTrail.execute({
      user_id: user.id,
      trail_id: trail.id,
    });

    expect(removeById).toHaveBeenCalledWith(userTrail.id);
  });

  it('should not be able to delete a user trail with non-existing user', async () => {
    const trail = await fakeTrailsRepository.create({
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
    const user = await fakeUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    const trail = await fakeTrailsRepository.create({
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
