import { createSlice } from "@reduxjs/toolkit";

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
        }
    }
});

export const { getAlive, getAll, getDead } = galleryFilter.actions;