import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCartFromLocalStorage} from "../../utils/getCartFromLocalStorage";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {CartItemType, CartStateType} from "./cartTypes";

const {items, totalPrice} = getCartFromLocalStorage()

const initialState: CartStateType = {
  totalPrice,
  items,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj => obj.id === action.payload.id))
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj => obj.id === action.payload))
      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--
          state.totalPrice = state.totalPrice - findItem.price
        }
      }
    },
    removeItems(state, action: PayloadAction<string>) {
      const price = state.items.filter((obj) => obj.id === action.payload).reduce((sum, obj)=>sum + obj.price*obj.count,0)
      state.items = state.items.filter((obj) => obj.id !== action.payload)
      state.totalPrice = state.totalPrice - price
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0

    },
  }
})


export const {clearItems, removeItems, addItems, minusItem} = cartSlice.actions
export default cartSlice.reducer