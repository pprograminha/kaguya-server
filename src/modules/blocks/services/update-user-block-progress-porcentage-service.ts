import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/user-blocks-repository';
import { IUserLessonsRepository } from '@modules/lessons/domain/repositories/user-lessons-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IUserBlock } from '../domain/entities/iuser-block';
import { IUpdateUserBlockProgressPorcentageRequestDTO } from '../dtos/update-user-block-progress-porcentage-request-dto';

@injectable()
export class UpdateUserBlockProgressPorcentageService {
  constructor(
    @inject('UserBlocksRepository')
    private userBlocksRepository: IUserBlocksRepository,

    @inject('UserLessonsRepository')
    private userLessonsRepository: IUserLessonsRepository,
  ) {}

  async execute({
    block_id,
    user_id,
  }: IUpdateUserBlockProgressPorcentageRequestDTO): Promise<IUserBlock> {
    const userBlock = await this.userBlocksRepository.findOne({
      block_id,
      user_id,
    });

    if (!userBlock)
      throw new AppError('This user block does not exist', 12, 400);

    const userLessons =
      await this.userLessonsRepository.findAllUserLessonsFromBlock({
        block_id,
        user_id,
      });

    const userLessonsCompleted = userLessons.filter(
      user_lesson => user_lesson.completed,
    );

    const userBlockProgressPercentage =
      (userLessonsCompleted.length / userLessons.length) * 100;

    userBlock.progress = userBlockProgressPercentage;

    await this.userBlocksRepository.save(userBlock);

    return userBlock;
  }
}
