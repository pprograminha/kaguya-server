import { IView } from '@modules/lessons/domain/entities/iview';
import { IViewsRepository } from '@modules/lessons/domain/repositories/views-repository';
import { CreateViewDTO } from '@modules/users/dtos/create-view-dto';
import { FindOneViewFromUserLessonDTO } from '@modules/users/dtos/find-one-view-from-user-lesson-dto';
import { View } from '@modules/users/entities/view';
import { AsyncMaybe } from '@shared/types/app';

class InMemoryViewsRepository implements IViewsRepository {
  private views: IView[] = [];

  async create(data: CreateViewDTO): Promise<IView> {
    const view = new View();

    Object.assign(view, data);

    this.views.push(view);

    return view;
  }

  async createMany(datas: CreateViewDTO[]): Promise<void> {
    datas.forEach(data => this.create(data));
  }

  async findById(view_id: string): AsyncMaybe<IView> {
    const findedView = this.views.find(view => view.id === view_id);

    return findedView;
  }

  async findAllViewsFromLesson(lesson_id: string): Promise<IView[]> {
    const views = this.views.filter(view => view.lesson_id === lesson_id);

    return views;
  }

  async findAllViewsFromUser(user_id: string): Promise<IView[]> {
    const views = this.views.filter(view => view.user_id === user_id);

    return views;
  }

  async findOneViewFromUserLesson({
    user_id,
    lesson_id,
  }: FindOneViewFromUserLessonDTO): AsyncMaybe<IView> {
    const findedView = this.views.find(
      view => view.user_id === user_id && view.lesson_id === lesson_id,
    );

    return findedView;
  }

  async save({ id: view_id, ...data }: IView): Promise<void> {
    const viewIndex = this.views.findIndex(view => view.id === view_id);

    if (viewIndex !== -1) {
      this.views[viewIndex] = {
        id: view_id,
        ...data,
      };
    }
  }

  async destroyById(view_id: string): Promise<void> {
    const viewIndex = this.views.findIndex(view => view.id === view_id);

    if (viewIndex !== -1) {
      this.views.splice(viewIndex, 1);
    }
  }
}

export { InMemoryViewsRepository };
