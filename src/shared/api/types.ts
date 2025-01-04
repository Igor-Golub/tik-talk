export interface PaginatedList<DataItem = any> {
  items: DataItem[];
  page: number;
  size: number;
  pages: number;
  total: number;
}
