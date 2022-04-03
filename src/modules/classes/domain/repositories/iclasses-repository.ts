import { CreateClassDTO } from '@modules/classes/dtos/create-class-dto';
import { FindByNameDTO } from '@modules/classes/dtos/find-by-name-dto';
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
  findAllClasses(): Promise<IClass[]>;
  findAllClassesFromBlock(block_id: string): Promise<IClass[]>;
}
export { IClassesRepository, RelationshipDTO };
