import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IRolesRepository } from '../domain/repositories/roles-repository';

@injectable()
class DeleteRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute(block_id: string): Promise<void> {
    const block = await this.rolesRepository.findById(block_id);

    if (!block) {
      throw new AppError('Block does not exist', 12, 400);
    }

    await this.rolesRepository.destroyById(block.id);
  }
}

export { DeleteRoleService };
