import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = 'All';

export const galleryFilter = createSlice({
    name: 'galleryFilter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string | undefined>) => action.payload ? action.payload: 'All',
    }
});

export const { setFilter } = galleryFilter.actions;