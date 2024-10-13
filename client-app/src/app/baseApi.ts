import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store/store";

export interface ApiResponse<T> {
  isSuccess: boolean;
  data?: T;
  errorMessage?: string;
}

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

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).accounts.userInfo?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  /*if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery("/refreshToken", api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      api.dispatch(tokenReceived(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(loggedOut());
    }
  }*/
  return result;
};

export const BaseApi = createApi({
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Event", "Venue"],
  endpoints: () => ({}),
});
