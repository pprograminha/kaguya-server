import { IUser } from '@modules/users/domain/entities/iuser';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { AppError } from '@shared/errors/app-error';
import { IStorageProvider } from '@shared/providers/storage-provider/models/storage-provider';
import { inject, injectable } from '@shared/container';
import { UpdateUserAvatarRequestDTO } from '../../roles/dtos/update-user-avatar-request-dto';

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    user_id,
    avatar,
  }: UpdateUserAvatarRequestDTO): Promise<IUser> {
    if (!avatar) throw new AppError('Avatar field is required', 8, 400);

    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 5, 401);

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    user.avatar = avatar;

    await this.usersRepository.save(user);

    await this.storageProvider.saveFile(user.avatar);

    return user;
  }
}
