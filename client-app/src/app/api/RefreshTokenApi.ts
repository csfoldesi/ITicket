import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Account } from "../models/account";
import { ApiResponse } from "./BaseApi";

export const RefreshTokenApi = createApi({
  reducerPath: "refreshToken",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/accounts/token/` }),
  endpoints: (builder) => ({
    refresh: builder.mutation<Account, string>({
      query: (refreshToken) => ({
        url: refreshToken,
        method: "POST",
      }),
      transformResponse: (response: ApiResponse<Account>): Account => response.data!,
    }),
  }),
});
