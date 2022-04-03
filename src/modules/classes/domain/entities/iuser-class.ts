import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { IUser } from '@modules/users/domain/entities/iuser';
import { IClass } from './iclass';

interface IUserClass {
  id: string;
  completed: boolean;
  user_id: string;
  user: IUser;
  block: IBlock;
  block_id: string;
  class_id: string;
  class: IClass;
  created_at: Date;
  updated_at: Date;
}

export { IUserClass };
