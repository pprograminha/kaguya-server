import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUser } from '../entities/IUser';

interface IUsersRepository {
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: ICreateUserDTO): Promise<IUser>;
}
export { IUsersRepository };
