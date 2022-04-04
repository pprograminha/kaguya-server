import { CreateClassDTO } from '@modules/classes/dtos/create-class-dto';
import { FindAllClassesFromBlockDTO } from '@modules/classes/dtos/find-all-classes-from-block-dto';
import { FindByNameDTO } from '@modules/classes/dtos/find-by-name-dto';
import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';
import { AsyncMaybe } from '@shared/types/app';
import { IClass } from '../entities/iclass';

type RelationshipDTO = {
  _count?: {
    likes?: boolean;
    dislikes?: boolean;
    views?: boolean;
  };
};
interface IClassesRepository {
  create(data: CreateClassDTO): Promise<IClass>;
  save(_class: IClass): Promise<IClass>;
  findById(
    class_id: string,
    relationship?: RelationshipDTO,
  ): AsyncMaybe<IClass>;
  findByName(
    data: FindByNameDTO,
    relationship?: RelationshipDTO,
  ): AsyncMaybe<IClass>;
  destroyById(class_id: string): Promise<void>;
  findAllClasses(data?: FiltersDTO): Promise<IClass[]>;
  findAllClassesFromBlock(data: FindAllClassesFromBlockDTO): Promise<IClass[]>;
}
export { IClassesRepository, RelationshipDTO };
