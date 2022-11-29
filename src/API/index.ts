import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICharacter } from '../store/slices/characters'

export interface Info {
    count: number;
    pages: number;
    next: string;
    prev?: any;
}

export interface IResponse {
    info: Info;
    results: ICharacter[];
}

// Define a service using a base URL and expected endpoints
export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<ICharacter[], void>({
      query: () => `character`,
      transformResponse: (response: IResponse) => response.results
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetCharactersQuery } = charactersApi;