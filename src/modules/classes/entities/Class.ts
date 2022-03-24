import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { IClass } from '@modules/classes/domain/entities/IClass';
import { IUserClass } from '@modules/classes/domain/entities/IUserClass';
import { v4 as uuid } from 'uuid';

class Class implements IClass {
  id: string;

  name: string;

  description: string;

  link: string;

  block: IBlock;

  user_classes: IUserClass[];

  block_id: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { Class };
