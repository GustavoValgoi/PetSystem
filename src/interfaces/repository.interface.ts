import { IFindPagination } from './pagination.interface';
import { IQueryPagination } from './query-pagination.interface';

export interface IRepository<T, U, V> {
  create(body: U): Promise<T>;
  update(id: string, body: V): Promise<T>;
  delete(id: string, otherId: string): Promise<T | null>;
  findById(id: string, otherId: string): Promise<T | null>;
  findAll(
    otherId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<T>>;
}
