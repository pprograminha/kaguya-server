import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { IClass } from '@modules/classes/domain/entities/IClass';
import { IUserClass } from '@modules/classes/domain/entities/IUserClass';
import { IUser } from '@modules/users/domain/entities/IUser';
import { v4 as uuid } from 'uuid';

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
    if (!this.id) this.id = uuid();
  }
}

export { UserClass };
