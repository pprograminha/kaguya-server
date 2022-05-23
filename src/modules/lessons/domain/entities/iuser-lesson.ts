import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { IUser } from '@modules/users/domain/entities/iuser';
import { ILesson } from './ilesson';

interface IUserLesson {
  id: string;
  completed: boolean;
  user_id: string;
  user: IUser;
  block: IBlock;
  block_id: string;
  lesson_id: string;
  lesson: ILesson;
  created_at: Date;
  updated_at: Date;
}

export { IUserLesson };
