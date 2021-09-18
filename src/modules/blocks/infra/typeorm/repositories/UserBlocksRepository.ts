import { IUserBlock } from '@modules/blocks/domain/entities/IUserBlock';
import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/IUserBlocksRepository';
import { ICreateUserBlockDTO } from '@modules/blocks/dtos/ICreateUserBlockDTO';
import { IFindAllUserBlocksFromPlaylistDTO } from '@modules/blocks/dtos/IFindAllUserBlocksFromPlaylistDTO';
import { getRepository, Repository } from 'typeorm';
import { UserBlock } from '../entities/UserBlock';

class UserBlocksRepository implements IUserBlocksRepository {
  private ormRepository: Repository<IUserBlock>;

  constructor() {
    this.ormRepository = getRepository(UserBlock);
  }

  async create(data: ICreateUserBlockDTO): Promise<IUserBlock> {
    const userBlock = this.ormRepository.create(data);

    await this.ormRepository.save(userBlock);

    return userBlock;
  }

  async findById(user_block_id: string): Promise<IUserBlock | undefined> {
    const userBlock = await this.ormRepository.findOne({
      where: {
        id: user_block_id,
      },
    });

    return userBlock;
  }

  async removeById(user_block_id: string): Promise<void> {
    await this.ormRepository.delete(user_block_id);
  }

  async findAllUserBlocksFromPlaylist({
    playlist_id,
    user_id,
  }: IFindAllUserBlocksFromPlaylistDTO): Promise<IUserBlock[]> {
    const userBlocks = await this.ormRepository.find({
      where: {
        playlist_id,
        user_id,
      },
    });

    return userBlocks;
  }
}
export { UserBlocksRepository };
