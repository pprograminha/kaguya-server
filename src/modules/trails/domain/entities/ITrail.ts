import { IUserTrail } from './IUserTrail';

interface ITrail {
  id: string;
  name: string;
  description: string;
  avatar: string;
  getAvatarUrl: () => string | null;
  avatar_url: string;
  userTrails: IUserTrail[];
  created_at: Date;
  updated_at: Date;
}
export { ITrail };
