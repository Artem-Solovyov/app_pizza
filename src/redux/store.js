import {configureStore} from '@reduxjs/toolkit'
import filterReducer from './filterSlice'
import cartReducer from './cartSlice'
import pizzaReducer from "./pizzaSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer
  }
})