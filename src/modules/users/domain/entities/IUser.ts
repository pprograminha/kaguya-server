import { IUserTrail } from '@modules/trails/domain/entities/IUserTrail';
import { IPlatformUserRole } from './IPlatformUserRole';

interface IUser {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  platformUserRoles: IPlatformUserRole[];
  userTrails: IUserTrail[];
  avatar: string;
  getAvatarUrl: () => string | null;
  avatar_url: string;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
}
export { IUser };
