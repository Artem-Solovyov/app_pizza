import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

type SortType = {
  name: string,
  sortProperty: string
}
export interface FilterStateType {
  searchValue: string,
  categoryId: number,
  pageCount: number,
  sort: SortType
}

const initialState: FilterStateType = {
  searchValue: '',
  categoryId: 0,
  pageCount: 1,
  sort: {name: 'популярністю ↓', sortProperty: 'rating'}
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSort(state, action: PayloadAction<SortType>){
      state.sort = action.payload
    },
    setPageCount(state, action: PayloadAction<number>){
      state.pageCount = action.payload
    },
    setFilters(state, action: PayloadAction<FilterStateType>){
      state.categoryId = Number(action.payload.categoryId)
      state.sort = action.payload.sort
      state.pageCount = Number(action.payload.pageCount)
    },
  }
})

export const selectFilter = (state: RootState) => state.filter

export const {setCategoryId, setSort, setPageCount, setFilters, setSearchValue} = filterSlice.actions
export default filterSlice.reducer