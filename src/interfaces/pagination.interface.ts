export interface IFindPagination<T> {
  page: number;
  limit: number;
  count: number;
  totalPages: number;
  data: T[];
}
