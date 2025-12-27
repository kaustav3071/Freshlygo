import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import mongoose from "mongoose";

interface IGrocery {
    id?: mongoose.Types.ObjectId;
    name: string;
    category: string;
    price: string;
    unit: string;
    quantity: number;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ICartSlice{
    cartData:IGrocery[]
}

const initialState:ICartSlice = {
    cartData: []
}

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart:(state, action:PayloadAction<IGrocery>)=>{
            state.cartData.push(action.payload)
        }
    },
});

export const { addToCart } = CartSlice.actions;
export default CartSlice.reducer;
