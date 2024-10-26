import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store/store";
import { Account } from "./models/account";

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

export const refreshTokenApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/accounts/token/` }),
  endpoints: (builder) => ({
    refresh: builder.mutation<ApiResponse<Account>, string>({
      query: (refreshToken) => ({
        url: refreshToken,
        method: "POST",
      }),
    }),
  }),
});

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).accounts.userInfo?.accessToken;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
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
  //console.log(result);
  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).accounts.userInfo?.refreshToken;
    if (refreshToken) {
      const refreshResult = await api.dispatch(refreshTokenApi.endpoints.refresh.initiate(refreshToken));
      if (refreshResult?.data?.isSuccess) {
        result = await baseQuery(args, api, extraOptions);
      }
      console.log("Acces token not received");
    } else {
      console.log("refreshToken not found");
      //api.dispatch(loggedOut());
    }
  }
  return result;
};

/*const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQueryWithErrorHandling(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).accounts.userInfo?.refreshToken;
    if (refreshToken) {
      const { data: refreshResult } = await api.dispatch(accountsApi.endpoints.refreshToken.initiate(refreshToken));
      if (refreshResult?.accessToken) {
        result = await baseQuery(args, api, extraOptions);
      }
      console.log("Acces token not received");
    } else {
      console.log("refreshToken not found");
      //api.dispatch(loggedOut());
    }
  }
  return result;
};*/

export const BaseApi = createApi({
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Event", "Venue"],
  endpoints: () => ({}),
});
