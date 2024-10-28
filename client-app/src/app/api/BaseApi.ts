import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { RefreshTokenApi } from "./RefreshTokenApi";

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


export const BaseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).accounts.userInfo?.accessToken;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const BaseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await BaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).accounts.userInfo?.refreshToken;
    if (refreshToken) {
      const { error } = await api.dispatch(RefreshTokenApi.endpoints.refresh.initiate(refreshToken));
      if (!error) {
        result = await BaseQuery(args, api, extraOptions);
      } else {
        console.log("Acces token not received");
      }
    } else {
      console.log("refreshToken not found");
      //api.dispatch(loggedOut());
    }
  }
  return result;
};

export const BaseApi = createApi({
  reducerPath: "api",
  baseQuery: BaseQueryWithErrorHandling,
  tagTypes: ["Event", "Venue"],
  endpoints: () => ({}),
});
export { RefreshTokenApi };

