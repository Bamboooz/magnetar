import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: "" as string,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            return action.payload;
        },
        getSearch: (state) => state,
    },
});

export const { setSearch, getSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
