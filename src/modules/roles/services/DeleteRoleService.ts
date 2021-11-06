import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IRolesRepository } from '../domain/repositories/IRolesRepository';

@injectable()
class DeleteRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute(block_id: string): Promise<void> {
    const block = await this.rolesRepository.findById(block_id);

    if (!block) {
      throw new AppError('Block does not exist', 403);
    }

    await this.rolesRepository.destroyById(block.id);
  }
}

export { DeleteRoleService };
