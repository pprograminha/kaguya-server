import { IClass } from '@modules/classes/domain/entities/iclass';
import { IUser } from '@modules/users/domain/entities/iuser';
import { IDislike } from '../domain/entities/idislike';

class Dislike implements IDislike {
  id: string;

  user_id: string;

  user: IUser;

  class_id: string;

  class: IClass;

  created_at: Date;

  updated_at: Date;
}

export { Dislike };
