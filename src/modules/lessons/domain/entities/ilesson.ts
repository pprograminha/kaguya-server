import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { IUserLesson } from './iuser-lesson';

interface ILesson {
  id: string;
  name: string;
  slug: string;
  description: string;
  link: string;
  block: IBlock;
  block_id: string;
  user_lessons: IUserLesson[];
  created_at: Date;
  updated_at: Date;
}

export { ILesson };
