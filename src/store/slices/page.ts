import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name: "page",
    initialState: -2 as number,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            return action.payload;
        },
        getPage: (state) => state,
    },
});

export const { setPage, getPage } = pageSlice.actions;
export const pageReducer = pageSlice.reducer;
