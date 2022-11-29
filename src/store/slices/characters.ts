import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IOrigin {
    name: string;
    url: string;
}

export interface ILocation {
    name: string;
    url: string;
}

export interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: IOrigin;
    location: ILocation;
    image: string;
    episode: string[];
    url: string;
    created: Date;
}

const initialState: ICharacter[] = [];

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        addCharacter: (state, action: PayloadAction<ICharacter>) => {
            state.push(action.payload)
        },

        addCharacters: (state, action: PayloadAction<ICharacter[] | undefined>) => {
            action.payload && state.push(...action.payload)
        },

        removeLastCharacter: (state) => {
            state.pop()
        },

        clearCharacters: (state) => {
            state = [];
        }
    }
});

export const { addCharacter, addCharacters, removeLastCharacter, clearCharacters } = charactersSlice.actions;
export const selectCharacters = (state: ICharacter[]) => state;