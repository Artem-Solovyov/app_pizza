export type SortType = {
  name: string,
  sortProperty: string
}
export interface FilterStateType {
  searchValue: string,
  categoryId: number,
  pageCount: number,
  sort: SortType
}