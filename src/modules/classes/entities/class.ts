import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { IClass } from '@modules/classes/domain/entities/iclass';
import crypto from 'crypto';
import { IUserClass } from '../domain/entities/iuser-class';

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
    this.id = crypto.randomUUID();
  }
}

export { Class };
