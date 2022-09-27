import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  searchValue: '',
  categoryId: 0,
  pageCount: 1,
  sort: {name: 'популярністю ↓', sortProperty: 'rating'}
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSort(state, action){
      state.sort = action.payload
    },
    setPageCount(state, action){
      state.pageCount = action.payload
    },
    setFilters(state, action){
      state.categoryId = Number(action.payload.categoryId)
      state.sort = action.payload.sort
      state.pageCount = Number(action.payload.pageCount)
    },
  }
})

export const selectFilter = (state) => state.filter

export const {setCategoryId, setSort, setPageCount, setFilters, setSearchValue} = filterSlice.actions
export default filterSlice.reducer