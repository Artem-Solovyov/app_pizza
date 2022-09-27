import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "./store";
import {FilterStateType} from "./filterSlice";
import {CartItemType} from "./cartSlice";

type PizzaType = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[],
  rating: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzaStateType {
  items: PizzaType[],
  status: Status
}

const initialState: PizzaStateType = {
  items: [],
  status: Status.LOADING,
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaType[]>) {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  }
})

export const fetchPizzas = createAsyncThunk<PizzaType[], FilterStateType>(
  'pizza/fetchPizzasStatus',
  async ({categoryId, sort, searchValue, pageCount}) => {
    const {data} = await axios.get<PizzaType[]>(
      `https://632b1dd01090510116d1c169.mockapi.io/items?search=${searchValue}&page=${
        pageCount}&limit=8&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${
        sort.sortProperty.includes('-') ? sort.sortProperty.substring(1) : sort.sortProperty}&order=${
        sort.sortProperty.includes('-') ? 'asc' : 'desc'}`
    )
    return data;
  })

export const selectPizza = (state: RootState) => state.pizza

export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer