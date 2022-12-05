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
  name?: string,
  status?: string,
  gender?: string,
}

const getQueryString = (props: QueryParams) => {
  let query = ''
  Object.entries(props).forEach((prop, index) => {
    if (prop[1] !== '' && prop[1] !== 'All') {
      if (index === 0) query += '?'
        else query += '&'
      query += `${prop[0]}=${prop[1]}`
    };
  })
  return query;
}

// Define a service using a base URL and expected endpoints
export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getFilteredCharacters: builder.query<IResponse, QueryParams>({
      query: (props) => `character/${getQueryString(props)}`,
      transformResponse: (response: IResponse) => response,
    }),
  }),
})

export const {
  useGetFilteredCharactersQuery
} = charactersApi;
