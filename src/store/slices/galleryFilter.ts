import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = 'All';

export const galleryFilter = createSlice({
    name: 'galleryFilter',
    initialState,
    reducers: {
        getAlive: (state) => {
            state = 'Alive'
        },

        getDead: (state) => {
            state = 'Dead';
        },

        getAll: (state) => {
            state = 'All';
        },

        setFilter: (state, action: PayloadAction<string | undefined>) => action.payload ? action.payload: 'All',
    }
});

export const { getAlive, getAll, getDead, setFilter } = galleryFilter.actions;