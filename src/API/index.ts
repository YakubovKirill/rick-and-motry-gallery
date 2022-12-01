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
    getStatusFilteredCharactersByPage: builder.query<IResponse, QueryParams>({
      query: ({ page, status }) => `character/?page=${page}${status !== 'All' ? `&status=${status}`: ''}`,
      transformResponse: (response: IResponse) => response,
    }),
  }),
})

export const {
  useGetStatusFilteredCharactersByPageQuery
} = charactersApi;
