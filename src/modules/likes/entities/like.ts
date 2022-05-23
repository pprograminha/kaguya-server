import { ILesson } from '@modules/lessons/domain/entities/ilesson';
import { IUser } from '@modules/users/domain/entities/iuser';
import { ILike } from '../domain/entities/ilike';

class Like implements ILike {
  id: string;

  user_id: string;

  user: IUser;

  lesson_id: string;

  lesson: ILesson;

  created_at: Date;

  updated_at: Date;
}

export { Like };
