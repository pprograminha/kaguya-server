import { UpdateUserBlockProgressPorcentageService } from '@modules/blocks/services/update-user-block-progress-porcentage-service';
import { UpdateUserPlaylistProgressPorcentageService } from '@modules/playlists/services/update-user-playlist-progress-porcentage-service';
import { UpdateUserTrailProgressPorcentageService } from '@modules/trails/services/update-user-trail-progress-porcentage-service';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { AppError } from '@shared/errors/app-error';
import { container, inject, injectable } from 'tsyringe';
import { IUserLesson } from '../domain/entities/iuser-lesson';
import { ILessonsRepository } from '../domain/repositories/lessons-repository';
import { IUserLessonsRepository } from '../domain/repositories/user-lessons-repository';
import { ChangeCompleteUserLessonRequestDTO } from '../dtos/change-complete-user-lesson-request-dto';

@injectable()
class ChangeCompleteUserLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserLessonsRepository')
    private userLessonsRepository: IUserLessonsRepository,
  ) {}

  async execute({
    lesson_id,
    user_id,
  }: ChangeCompleteUserLessonRequestDTO): Promise<IUserLesson> {
    const user = await this.usersRepository.findById(user_id);
    const _lesson = await this.lessonsRepository.findById(lesson_id);

    if (!user) throw new AppError('User does not exist', 12, 401);
    if (!_lesson) throw new AppError('Lesson entered does not exists', 12, 403);

    const userLesson = await this.userLessonsRepository.findOne({
      lesson_id,
      user_id,
    });

    if (!userLesson)
      throw new AppError('This user lesson does not exist', 13, 403);

    userLesson.completed = !userLesson.completed;

    await this.userLessonsRepository.save(userLesson);

    const updateUserBlockProgressPorcentage = container.resolve(
      UpdateUserBlockProgressPorcentageService,
    );

    const userBlock = await updateUserBlockProgressPorcentage.execute({
      user_id,
      block_id: _lesson.block_id,
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

    return userLesson;
  }
}

export { ChangeCompleteUserLessonService };
