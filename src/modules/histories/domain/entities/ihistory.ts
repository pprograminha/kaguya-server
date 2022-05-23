import { ILesson } from '@modules/lessons/domain/entities/ilesson';
import { IUser } from '@modules/users/domain/entities/iuser';

interface IHistory {
  id: string;
  user_id: string;
  user: IUser;
  lesson_id: string;
  lesson: ILesson;
  recent_at: Date;
  created_at: Date;
  updated_at: Date;
}

export { IHistory };
