import { CreateViewDTO } from '@modules/users/dtos/create-view-dto';
import { FindOneViewFromUserLessonDTO } from '@modules/users/dtos/find-one-view-from-user-lesson-dto';
import { AsyncMaybe } from '@shared/types/app';
import { IView } from '../entities/iview';

interface IViewsRepository {
  create(data: CreateViewDTO): Promise<IView>;
  createMany(datas: CreateViewDTO[]): Promise<void>;
  findById(view_id: string): AsyncMaybe<IView>;
  findAllViewsFromLesson(lesson_id: string): Promise<IView[]>;
  findAllViewsFromUser(user_id: string): Promise<IView[]>;
  findOneViewFromUserLesson(
    data: FindOneViewFromUserLessonDTO,
  ): AsyncMaybe<IView>;
  save(view: IView): Promise<void>;
  destroyById(view_id: string): Promise<void>;
}
export { IViewsRepository };
