import { FakeTrailsRepository } from '@modules/trails/infra/typeorm/repositories/fakes/FakeTrailsRepository';
import { FakeUserTrailsRepository } from '@modules/trails/infra/typeorm/repositories/fakes/FakeUserTrailsRepository';
import { RemoveUserTrailService } from '@modules/trails/services/RemoveUserTrailService';
import { FakeUsersRepository } from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';

let fakeUserTrailsRepository: FakeUserTrailsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeTrailsRepository: FakeTrailsRepository;

let removeUserTrail: RemoveUserTrailService;

describe('RemoveUserTrail', () => {
  beforeEach(() => {
    fakeUserTrailsRepository = new FakeUserTrailsRepository();
    fakeTrailsRepository = new FakeTrailsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    removeUserTrail = new RemoveUserTrailService(
      fakeUserTrailsRepository,
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
    const userTrail = await fakeUserTrailsRepository.create({
      trail_id: 'trail-id',
      user_id: user.id,
    });

    const removeById = jest.spyOn(fakeUserTrailsRepository, 'removeById');

    await removeUserTrail.execute({
      user_id: user.id,
      user_trail_id: userTrail.id,
    });

    expect(removeById).toHaveBeenCalledWith(userTrail.id);
  });

  it('should not be able to delete a user trail with non-existing user', async () => {
    const trail = await fakeTrailsRepository.create({
      description: 'Xxxx',
      name: 'Xxxx',
    });

    const userTrail = await fakeUserTrailsRepository.create({
      trail_id: trail.id,
      user_id: 'non-existing-user',
    });

    await expect(
      removeUserTrail.execute({
        user_id: 'non-existing-user',
        user_trail_id: userTrail.id,
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

    await expect(
      removeUserTrail.execute({
        user_id: user.id,
        user_trail_id: 'non-existing-user-trail',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
