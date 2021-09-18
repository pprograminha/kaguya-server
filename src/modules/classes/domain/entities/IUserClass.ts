import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { IUser } from '@modules/users/domain/entities/IUser';
import { IClass } from './IClass';

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
