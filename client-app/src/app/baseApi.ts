import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store/store";

export interface ListResponse<T> {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  items: T[];
  hasMorePages?: boolean;
}

export interface PagedQuery {
  pageNumber?: number;
  pageSize?: number;
}

export const BaseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).accounts.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Event", "Venue"],
  endpoints: () => ({}),
});
