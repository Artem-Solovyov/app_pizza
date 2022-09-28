import {createAsyncThunk} from "@reduxjs/toolkit";
import {PizzaType} from "./types";
import {FilterStateType} from "../filter/types";
import axios from "axios";

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
