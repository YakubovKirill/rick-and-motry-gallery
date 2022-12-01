import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
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

interface QueryParams {
  page: number,
  status: string,
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
    getCharactersByPage: builder.query<IResponse, string>({
      query: (page) => `character/?page=${page}`,
      transformResponse: (response: IResponse) => response,
    }),
    getStatusFilteredCharactersByPage: builder.query<IResponse, QueryParams>({
      query: ({ page, status }) => `character/?page=${page}&status=${status}`,
      transformResponse: (response: IResponse) => response,
    }),
  }),
})

export const { useGetCharactersQuery, useGetCharactersByPageQuery, useGetStatusFilteredCharactersByPageQuery } = charactersApi;
