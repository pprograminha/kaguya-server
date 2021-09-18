import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUser } from '../entities/IUser';

interface IRelationshipsDTO {
  platform_user_role?: boolean;
}

interface IUsersRepository {
  findByEmail(email: string): Promise<IUser | undefined>;
  findById(
    id: string,
    relationships?: IRelationshipsDTO,
  ): Promise<IUser | undefined>;
  create(data: ICreateUserDTO): Promise<IUser>;
  save(user: IUser): Promise<IUser>;

  findAll(): Promise<IUser[]>;
}
export { IUsersRepository, IRelationshipsDTO };
