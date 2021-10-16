import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { IUserClass } from './IUserClass';

interface IClass {
  id: string;
  name: string;
  description: string;
  link: string;
  block: IBlock;
  block_id: string;
  user_classes: IUserClass[];
  created_at: Date;
  updated_at: Date;
}

export { IClass };
