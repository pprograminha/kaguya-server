import { ILesson } from '@modules/lessons/domain/entities/ilesson';
import { IUser } from '@modules/users/domain/entities/iuser';

interface IView {
  id: string;
  user_id: string;
  user: IUser;
  lesson_id: string;
  lesson: ILesson;
  created_at: Date;
  updated_at: Date;
}

export { IView };
