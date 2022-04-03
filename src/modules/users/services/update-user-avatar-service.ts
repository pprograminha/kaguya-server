import { IUser } from '@modules/users/domain/entities/iuser';
import { IUsersRepository } from '@modules/users/domain/repositories/iusers-repository';
import { AppError } from '@shared/errors/AppError';
import { IStorageProvider } from '@shared/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from '@shared/container';
import { IUpdateUserAvatarRequestDTO } from '../../roles/dtos/IUpdateUserAvatarRequestDTO';

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
  }: IUpdateUserAvatarRequestDTO): Promise<IUser> {
    if (!avatar) throw new AppError('Avatar field is required', 403);

    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 400);

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    user.avatar = avatar;

    await this.usersRepository.save(user);

    await this.storageProvider.saveFile(user.avatar);

    return user;
  }
}
