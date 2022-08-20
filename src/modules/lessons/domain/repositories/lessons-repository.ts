import { CreateLessonDTO } from '@modules/lessons/dtos/create-lesson-dto';
import { FindAllLessonsFromBlockDTO } from '@modules/lessons/dtos/find-all-lessons-from-block-dto';
import { FindByNameDTO } from '@modules/lessons/dtos/find-by-name-dto';
import { FindBySlugDTO } from '@modules/lessons/dtos/find-by-slug-dto';
import { ILike } from '@modules/likes/domain/entities/ilike';
import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';
import { AsyncMaybe } from '@shared/types/app';
import { ILesson } from '../entities/ilesson';

type RelationshipDTO = {
  _count?: {
    likes?: boolean;
    dislikes?: boolean;
    views?: boolean;
  };
};
interface ILessonsRepository {
  create(data: CreateLessonDTO): Promise<ILesson>;
  save(_lesson: ILesson): Promise<ILesson>;
  findById(
    lesson_id: string,
    relationship?: RelationshipDTO,
  ): AsyncMaybe<
    ILesson & {
      likes: ILike[];
    }
  >;
  findLessonWithMostViews(): AsyncMaybe<ILesson>;
  findByName(
    data: FindByNameDTO,
    relationship?: RelationshipDTO,
  ): AsyncMaybe<ILesson>;
  findBySlug(
    data: FindBySlugDTO,
    relationship?: RelationshipDTO,
  ): AsyncMaybe<
    ILesson & {
      likes: ILike[];
    }
  >;
  destroyById(lesson_id: string): Promise<void>;
  findAllLessons(data?: FiltersDTO): Promise<ILesson[]>;
  findAllLessonsFromBlock(data: FindAllLessonsFromBlockDTO): Promise<ILesson[]>;
}
export { ILessonsRepository, RelationshipDTO };
