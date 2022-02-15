import { UpdateUserBlockProgressPorcentageService } from '@modules/blocks/services/UpdateUserBlockProgressPorcentageService';
import { UpdateUserPlaylistProgressPorcentageService } from '@modules/playlists/services/UpdateUserPlaylistProgressPorcentageService';
import { UpdateUserTrailProgressPorcentageService } from '@modules/trails/services/UpdateUserTrailProgressPorcentageService';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { container, inject, injectable } from 'tsyringe';
import { IUserClass } from '../domain/entities/IUserClass';
import { IClassesRepository } from '../domain/repositories/IClassesRepository';
import { IUserClassesRepository } from '../domain/repositories/IUserClassesRepository';
import { ChangeCompleteUserClassRequestDTO } from '../dtos/ChangeCompleteUserClassRequestDTO';

@injectable()
class ChangeCompleteUserClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserClassesRepository')
    private userClassesRepository: IUserClassesRepository,
  ) {}

  async execute({
    class_id,
    user_id,
  }: ChangeCompleteUserClassRequestDTO): Promise<IUserClass> {
    const user = await this.usersRepository.findById(user_id);
    const _class = await this.classesRepository.findById(class_id);

    if (!user) throw new AppError('User not found', 401);
    if (!_class) throw new AppError('Class entered does not exists', 403);

    const userClass = await this.userClassesRepository.findOne({
      class_id,
      user_id,
    });

    if (!userClass) throw new AppError('This user class does not exist', 403);

    userClass.completed = !userClass.completed;

    await this.userClassesRepository.save(userClass);

    const updateUserBlockProgressPorcentage = container.resolve(
      UpdateUserBlockProgressPorcentageService,
    );

    const userBlock = await updateUserBlockProgressPorcentage.execute({
      user_id,
      block_id: _class.block_id,
    });

    const updateUserPlaylistProgressPorcentage = container.resolve(
      UpdateUserPlaylistProgressPorcentageService,
    );

    const userPlaylist = await updateUserPlaylistProgressPorcentage.execute({
      user_id,
      playlist_id: userBlock.playlist_id,
    });

    const updateUserTrailProgressPorcentage = container.resolve(
      UpdateUserTrailProgressPorcentageService,
    );

    await updateUserTrailProgressPorcentage.execute({
      user_id,
      trail_id: userPlaylist.trail_id,
    });

    return userClass;
  }
}

export { ChangeCompleteUserClassService };
