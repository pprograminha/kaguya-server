import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { IClass } from '@modules/classes/domain/entities/iclass';
import { IUser } from '@modules/users/domain/entities/iuser';
import crypto from 'crypto';
import { IUserClass } from '../domain/entities/iuser-class';

class UserClass implements IUserClass {
  id: string;

  class: IClass;

  block: IBlock;

  user: IUser;

  block_id: string;

  user_id: string;

  completed: boolean;

  class_id: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    this.id = crypto.randomUUID();
  }
}

export { UserClass };
