import { CreateUserPlaylistsService } from '@modules/playlists/services/create-user-playlists-service';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IUserTrail } from '../domain/entities/iuser-trail';
import { ITrailsRepository } from '../domain/repositories/trails-repository';
import { IUserTrailsRepository } from '../domain/repositories/user-trails-repository';
import { CreateUserTrailRequestDTO } from '../dtos/create-user-trail-request-dto';

@injectable()
export class CreateUserTrailService {
  constructor(
    @inject('UserTrailsRepository')
    private userTrailsRepository: IUserTrailsRepository,

    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CreateUserPlaylistsService')
    private createUserPlaylistsService: CreateUserPlaylistsService,
  ) {}

  async execute({
    trail_id,
    user_id,
  }: CreateUserTrailRequestDTO): Promise<IUserTrail> {
    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail) throw new AppError('Trail does not exist', 400);

    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 400);

    const checkUserTrailAlreadyExists =
      await this.userTrailsRepository.findUserTrail({
        trail_id,
        user_id,
      });

    if (checkUserTrailAlreadyExists)
      throw new AppError('User trail already exists', 403);

    const userTrail = await this.userTrailsRepository.create({
      trail_id,
      user_id,
    });

    await this.createUserPlaylistsService.execute({
      user_id,
      trail_id,
    });

    const userTrailFinded = await this.userTrailsRepository.findById(
      userTrail.id,
    );

    if (!userTrailFinded) throw new AppError('User trail does not exist', 400);

    return userTrailFinded;
  }
}
