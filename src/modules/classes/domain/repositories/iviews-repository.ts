import { CreateViewDTO } from '@modules/users/dtos/CreateViewDTO';
import { FindOneViewFromUserClass } from '@modules/users/dtos/FindOneViewFromUserClass';
import { AsyncMaybe } from '@shared/types/app';
import { IView } from '../entities/iview';

interface IViewsRepository {
  create(data: CreateViewDTO): Promise<IView>;
  createMany(datas: CreateViewDTO[]): Promise<void>;
  findById(view_id: string): AsyncMaybe<IView>;
  findAllViewsFromClass(class_id: string): Promise<IView[]>;
  findAllViewsFromUser(user_id: string): Promise<IView[]>;
  findOneViewFromUserClass(data: FindOneViewFromUserClass): AsyncMaybe<IView>;
  save(view: IView): Promise<void>;
  destroyById(view_id: string): Promise<void>;
}
export { IViewsRepository };
