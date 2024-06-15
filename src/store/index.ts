import { configureStore } from "@reduxjs/toolkit";

import { pageReducer } from "./slices/page";
import { searchReducer } from "./slices/search";
import { settingsReducer } from "./slices/settings";

const store = configureStore({
    reducer: {
        search: searchReducer,
        page: pageReducer,
        settings: settingsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
