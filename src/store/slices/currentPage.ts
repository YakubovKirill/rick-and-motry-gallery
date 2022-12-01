import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = 1;

export const currentPage = createSlice({
    name: 'currentPage',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number | number>) => action.payload,
    }
});

export const { setCurrentPage } = currentPage.actions;
