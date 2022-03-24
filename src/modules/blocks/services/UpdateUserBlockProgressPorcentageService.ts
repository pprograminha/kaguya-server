import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/IUserBlocksRepository';
import { IUserClassesRepository } from '@modules/classes/domain/repositories/IUserClassesRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { IUserBlock } from '../domain/entities/IUserBlock';
import { IUpdateUserBlockProgressPorcentageRequestDTO } from '../dtos/IUpdateUserBlockProgressPorcentageRequestDTO';

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

    if (!userBlock) throw new AppError('This user block does not exist', 403);

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
