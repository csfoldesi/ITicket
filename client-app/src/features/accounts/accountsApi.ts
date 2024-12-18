import { ApiResponse, BaseApi } from "../../app/api/BaseApi";
import { Account, LoginDto, Profile, RegisterDto } from "../../app/models/account";

export const accountsApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Account, LoginDto>({
      query: (login) => {
        return {
          url: "accounts",
          method: "post",
          body: login,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      transformResponse: (response: ApiResponse<Account>): Account => response.data!,
    }),
    register: builder.mutation<Account, RegisterDto>({
      query: (register) => {
        return {
          url: "accounts/register",
          method: "post",
          body: register,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      transformResponse: (response: ApiResponse<Account>): Account => response.data!,
    }),
    getProfile: builder.query<Profile, void>({
      query: () => {
        return {
          url: "accounts",
          method: "get",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      transformResponse: (response: ApiResponse<Profile>): Profile => response.data!,
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } = accountsApi;
