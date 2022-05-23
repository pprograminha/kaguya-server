import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { CreateUserPlaylistsService } from '@modules/playlists/services/create-user-playlists-service';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { ITrail } from '../domain/entities/itrail';
import { IUserTrail } from '../domain/entities/iuser-trail';
import { ITrailsRepository } from '../domain/repositories/trails-repository';
import { IUserTrailsRepository } from '../domain/repositories/user-trails-repository';
import { CreateUserTrailRequestDTO } from '../dtos/create-user-trail-request-dto';
import {
  Count,
  CustomUserTrail,
} from './list-all-user-trails-from-user-service';

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
  }: CreateUserTrailRequestDTO): Promise<CustomUserTrail> {
    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail) throw new AppError('Trail does not exist', 12, 400);

    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 5, 400);

    const checkUserTrailAlreadyExists =
      await this.userTrailsRepository.findUserTrail({
        trail_id,
        user_id,
      });

    if (checkUserTrailAlreadyExists) {
      if (checkUserTrailAlreadyExists.enabled) {
        throw new AppError('User trail already exists', 23, 403);
      }

      checkUserTrailAlreadyExists.enabled = true;

      await this.userTrailsRepository.save(checkUserTrailAlreadyExists);
    }

    let userTrail: IUserTrail | null = null;

    if (!checkUserTrailAlreadyExists) {
      userTrail = await this.userTrailsRepository.create({
        trail_id,
        user_id,
      });
    }

    await this.createUserPlaylistsService.execute({
      user_id,
      trail_id,
    });

    const findedUserTrail = await this.userTrailsRepository.findById(
      userTrail?.id || (checkUserTrailAlreadyExists as IUserTrail).id,
      {
        called_in_user_trail: true,
      },
    );

    if (!findedUserTrail)
      throw new AppError('User trail does not exist', 12, 400);

    const lessonsAmount = trail.playlists.reduce(
      (_, playlist) =>
        playlist.blocks.reduce(
          (acc, block) => acc + (block as IBlock & Count)._count.lessons,
          0,
        ),
      0,
    );

    const customUserTrail: CustomUserTrail = {
      id: trail.id,
      name: trail.name,
      avatar: trail.avatar,
      playlists: undefined,
      user: findedUserTrail.user,
      updated_at: findedUserTrail.updated_at,
      created_at: findedUserTrail.created_at,
      _count: {
        playlists: (findedUserTrail.trail as ITrail & Count)?._count.playlists,
        user_trails: undefined,
        users: (findedUserTrail.trail as ITrail & Count)?._count.user_trails,
        lessons: lessonsAmount,
      },
      user_trail: {
        enabled: findedUserTrail.enabled,
        progress: findedUserTrail.progress,
      },
    };

    return customUserTrail;
  }
}
