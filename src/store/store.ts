import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user_slice";

const store = configureStore({
    reducer: {
        userReducer
    }
});

export default store;