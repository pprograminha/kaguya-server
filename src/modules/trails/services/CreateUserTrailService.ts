import { CreateUserPlaylistsService } from '@modules/playlists/services/CreateUserPlaylistsService';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserTrail } from '../domain/entities/IUserTrail';
import { ITrailsRepository } from '../domain/repositories/ITrailsRepository';
import { IUserTrailsRepository } from '../domain/repositories/IUserTrailsRepository';
import { ICreateUserTrailRequestDTO } from '../dtos/ICreateUserTrailRequestDTO';

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
  }: ICreateUserTrailRequestDTO): Promise<IUserTrail> {
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

    const userTrailFinded = await this.userTrailsRepository.findById(
      userTrail.id,
    );

    if (!userTrailFinded) throw new AppError('User trail does not exist', 400);

    await this.createUserPlaylistsService.execute({
      user_id,
      trail_id,
    });

    return userTrailFinded;
  }
}
