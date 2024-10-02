import { BaseApi } from "../../app/baseApi";
import { Account, LoginDto } from "../../app/models/account";

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
    }),
    getProfile: builder.query<Account, null>({
      query: () => {
        return {
          url: "accounts",
          method: "get",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = accountsApi;
