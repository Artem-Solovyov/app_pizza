import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async ({
                                                                                categoryId,
                                                                                sort,
                                                                                searchValue,
                                                                                pageCount
                                                                              }) => {
  const {data} = await axios.get(`https://632b1dd01090510116d1c169.mockapi.io/items?search=${searchValue}&page=${pageCount}&limit=8&${
      categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${
      sort.sortProperty.includes('-') ? sort.sortProperty.substring(1) : sort.sortProperty}&order=${
      sort.sortProperty.includes('-') ? 'asc' : 'desc'} `)
  return data
})

const initialState = {
  items: [],
  status: 'loading',
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading'
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'success'
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error'
      state.items = []
    }
  }

})
export const selectPizza = (state) => state.pizza

export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer