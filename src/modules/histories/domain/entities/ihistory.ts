import { IClass } from '@modules/classes/domain/entities/iclass';
import { IUser } from '@modules/users/domain/entities/iuser';

interface IHistory {
  id: string;
  user_id: string;
  user: IUser;
  class_id: string;
  class: IClass;
  recent_at: Date;
  created_at: Date;
  updated_at: Date;
}

export { IHistory };
