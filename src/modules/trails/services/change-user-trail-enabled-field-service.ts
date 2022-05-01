import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { IUserTrail } from '../domain/entities/iuser-trail';
import { ITrailsRepository } from '../domain/repositories/trails-repository';
import { IUserTrailsRepository } from '../domain/repositories/user-trails-repository';
import { ChangeUserTrailEnabledFieldRequestDTO } from '../dtos/change-user-trail-enabled-field-request-dto';

@injectable()
export class ChangeUserTrailEnabledFieldService {
  constructor(
    @inject('UserTrailsRepository')
    private userTrailsRepository: IUserTrailsRepository,

    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    trail_id,
    user_id,
  }: ChangeUserTrailEnabledFieldRequestDTO): Promise<IUserTrail> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 5, 401);

    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail) throw new AppError('Trail does not exist', 12, 400);

    const userTrail = await this.userTrailsRepository.findUserTrail({
      trail_id,
      user_id,
    });

    if (!userTrail) throw new AppError('User trail does not exist', 13, 400);

    userTrail.enabled = !userTrail.enabled;

    await this.userTrailsRepository.save(userTrail);

    return userTrail;
  }
}
