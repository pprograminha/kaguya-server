import crypto from 'crypto';
import { IUserPlaylist } from '@modules/playlists/domain/entities/iuser-playlist';
import { IUserTrail } from '@modules/trails/domain/entities/iuser-trail';
import { IUserRole } from '@modules/users/domain/entities/iuser-role';
import { IDislike } from '@modules/likes/domain/entities/idislike';
import { ILike } from '@modules/likes/domain/entities/ilike';
import { IView } from '@modules/lessons/domain/entities/iview';
import { IUserBlock } from '@modules/blocks/domain/entities/iuser-block';
import { IUserLesson } from '@modules/lessons/domain/entities/iuser-lesson';
import { IUser } from '../domain/entities/iuser';

class User implements IUser {
  id: string;

  name: string;

  email: string;

  avatar: string;

  user_roles: IUserRole[];

  user_trails: IUserTrail[];

  user_playlists: IUserPlaylist[];

  user_lessons: IUserLesson[];

  user_blocks: IUserBlock[];

  views: IView[];

  dislikes: IDislike[];

  likes: ILike[];

  username: string;

  enabled: boolean;

  password: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    this.id = crypto.randomUUID();
  }
}
export { User };
