import { IPlatformUserRole } from '../domain/entities/IPlatformUserRole';

interface ICreateUserDTO {
  email: string;
  name: string;
  platformUserRole?: IPlatformUserRole[];
  username: string;
  password: string;
}
export { ICreateUserDTO };
