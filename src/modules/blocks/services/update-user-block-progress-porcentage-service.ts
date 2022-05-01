import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/user-blocks-repository';
import { IUserClassesRepository } from '@modules/classes/domain/repositories/user-classes-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IUserBlock } from '../domain/entities/iuser-block';
import { IUpdateUserBlockProgressPorcentageRequestDTO } from '../dtos/update-user-block-progress-porcentage-request-dto';

@injectable()
export class UpdateUserBlockProgressPorcentageService {
  constructor(
    @inject('UserBlocksRepository')
    private userBlocksRepository: IUserBlocksRepository,

    @inject('UserClassesRepository')
    private userClassesRepository: IUserClassesRepository,
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

    const userClasses =
      await this.userClassesRepository.findAllUserClassesFromBlock({
        block_id,
        user_id,
      });

    const userClassesCompleted = userClasses.filter(
      user_class => user_class.completed,
    );

    const userBlockProgressPercentage =
      (userClassesCompleted.length / userClasses.length) * 100;

    userBlock.progress = userBlockProgressPercentage;

    await this.userBlocksRepository.save(userBlock);

    return userBlock;
  }
}
