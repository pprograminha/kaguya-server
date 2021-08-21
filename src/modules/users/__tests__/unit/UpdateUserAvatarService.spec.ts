import { FakeUsersRepository } from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository';
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService';
import { AppError } from '@shared/errors/AppError';
import { FakeStorageProvider } from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatar: 'xxxxxxx.xxx',
    });

    const userUpdated = await updateUserAvatar.execute({
      user_id: user.id,
      avatar: 'xxxxxx.xxx',
    });

    expect(userUpdated.avatar).toBe('xxxxxx.xxx');
  });

  it('should not be able to update user avatar if not entered', async () => {
    const user = await fakeUsersRepository.create({
      email: 'xxxxx@xxxx.xxx',
      name: 'xxxxxx',
      username: 'xxxxxx',
      password: 'xxxxxx',
    });

    expect(
      updateUserAvatar.execute({
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user avatar if non-existing user', async () => {
    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatar: 'xxxxx.xxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
