import { IUserTrail } from '@modules/trails/domain/entities/IUserTrail';
import { IPlatformUserRole } from './IPlatformUserRole';

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  platformUserRoles: IPlatformUserRole[];
  userTrails: IUserTrail[];
  username: string;
  enabled: boolean;
  password: string;
  getAvatarUrl(): string | null;
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
}
export { IUser };
