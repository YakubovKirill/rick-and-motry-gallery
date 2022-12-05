import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PERSON_GENDER, PERSON_STATUS } from "../../types";

interface GalleryFilter {
    page: number,
    name: string,
    status: string,
    gender: string,
}

const initialState = {
    page: 1,
    name: '',
    status: PERSON_STATUS.ALL,
    gender: PERSON_GENDER.ALL,
}

export const galleryFilter = createSlice({
    name: 'galleryFilter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<GalleryFilter>) => ({...action.payload}),
    }
});

export const { setFilter } = galleryFilter.actions;