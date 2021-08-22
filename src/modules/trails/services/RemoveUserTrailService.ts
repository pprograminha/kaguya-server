import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserTrailsRepository } from '../domain/repositories/IUserTrailsRepository';
import { IDestroyUserTrailRequestDTO } from '../dtos/IDestroyUserTrailRequestDTO';

@injectable()
export class RemoveUserTrailService {
  constructor(
    @inject('UserTrailsRepository')
    private userTrailsRepository: IUserTrailsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    user_trail_id,
    user_id,
  }: IDestroyUserTrailRequestDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 400);

    const userTrail = await this.userTrailsRepository.findById(user_trail_id);

    if (!userTrail) throw new AppError('User Trail does not exist', 400);

    await this.userTrailsRepository.removeById(userTrail.id);
  }
}
