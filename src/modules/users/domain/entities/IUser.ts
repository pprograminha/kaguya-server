import { IPlatformUserRole } from './IPlatformUserRole';

interface IUser {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  platformUserRoles: IPlatformUserRole[];
  avatar: string;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
}
export { IUser };
