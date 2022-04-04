import { UpdateUserAvatarService } from '@modules/users/services/update-user-avatar-service';
import { AppError } from '@shared/errors/app-error';
import { InMemoryStorageProvider } from '@shared/providers/storage-provider/in-memory/in-memory-storage-provider';
import { InMemoryUsersRepository } from '../in-memory/in-memory-users-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStorageProvider: InMemoryStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStorageProvider = new InMemoryStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      inMemoryUsersRepository,
      inMemoryStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await inMemoryUsersRepository.create({
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
    const user = await inMemoryUsersRepository.create({
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
