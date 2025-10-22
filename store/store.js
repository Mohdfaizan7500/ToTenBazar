import { configureStore, ReturnType } from "@reduxjs/toolkit"
import userReducer from "../store/slices/userSlice";
import authReducer from "../store/slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user:userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"],
            },
        }),
})

