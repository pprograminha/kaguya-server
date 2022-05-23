import { ILesson } from '@modules/lessons/domain/entities/ilesson';
import { IUser } from '@modules/users/domain/entities/iuser';
import { IDislike } from '../domain/entities/idislike';

class Dislike implements IDislike {
  id: string;

  user_id: string;

  user: IUser;

  lesson_id: string;

  lesson: ILesson;

  created_at: Date;

  updated_at: Date;
}

export { Dislike };
