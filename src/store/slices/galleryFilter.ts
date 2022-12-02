import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PERSON_STATUS } from "../../types";

const initialState: string = PERSON_STATUS.ALL;

export const galleryFilter = createSlice({
    name: 'galleryFilter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string | undefined>) => action.payload ? action.payload: PERSON_STATUS.ALL,
    }
});

export const { setFilter } = galleryFilter.actions;