import { ILesson } from '@modules/lessons/domain/entities/ilesson';
import { IUser } from '@modules/users/domain/entities/iuser';
import { IView } from '../../lessons/domain/entities/iview';

class View implements IView {
  id: string;

  user_id: string;

  user: IUser;

  lesson_id: string;

  lesson: ILesson;

  created_at: Date;

  updated_at: Date;
}

export { View };
