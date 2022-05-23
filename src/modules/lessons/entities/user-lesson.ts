import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { ILesson } from '@modules/lessons/domain/entities/ilesson';
import { IUser } from '@modules/users/domain/entities/iuser';
import crypto from 'crypto';
import { IUserLesson } from '../domain/entities/iuser-lesson';

class UserLesson implements IUserLesson {
  id: string;

  lesson: ILesson;

  block: IBlock;

  user: IUser;

  block_id: string;

  user_id: string;

  completed: boolean;

  lesson_id: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    this.id = crypto.randomUUID();
  }
}

export { UserLesson };
