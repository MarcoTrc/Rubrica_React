import { Action, configureStore, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { contattiApi, useGetContattiQuery } from "./API";

export const store = configureStore({

    reducer: {
        [contattiApi.reducerPath]: contattiApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contattiApi.middleware),
});

setupListeners(store.dispatch); export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export { contattiApi, useGetContattiQuery } from "./API"