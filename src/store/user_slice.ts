import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserState = {
    level: number,
    levelPercentage: number,
}

const initialState: UserState = {
    level: 0,
    levelPercentage: 0.0
}

const userSlice = createSlice({
    name: "user_slice",
    initialState,
    reducers: {
        levelUp: (state) => {
            state.level += 1;
        }
    }
});