import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ListResponse<T> {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  items: T[];
}

export const BaseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: () => ({}),
});
