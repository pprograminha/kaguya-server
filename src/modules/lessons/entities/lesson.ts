import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { ILesson } from '@modules/lessons/domain/entities/ilesson';
import crypto from 'crypto';
import { IUserLesson } from '../domain/entities/iuser-lesson';

class Lesson implements ILesson {
  id: string;

  name: string;

  description: string;

  link: string;

  block: IBlock;

  user_lessons: IUserLesson[];

  block_id: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    this.id = crypto.randomUUID();
  }
}

export { Lesson };
