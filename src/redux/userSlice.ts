import { createSlice } from "@reduxjs/toolkit";
import mongoose from "mongoose";

interface IUser {
    _id?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    mobile?: string;
    role: "user" | "deliveryPartner" | "admin";
    image?: string;
}

interface IUserSlice{
    userData: IUser | null
}

const initialState:IUserSlice = {
    userData: null
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
});

export const { setUserData } = UserSlice.actions;
export default UserSlice.reducer;
