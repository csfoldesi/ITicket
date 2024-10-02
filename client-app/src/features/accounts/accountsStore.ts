import { Account } from "../../app/models/account";
import { createAppSlice } from "../../app/store/createAppSlice";
import { RootState } from "../../app/store/store";
import { accountsApi } from "./accountsApi";

export interface AccountsState {
  userInfo: Account | null;
  token: string | null;
}

const initialState: AccountsState = {
  userInfo: null,
  token: null,
};

export const accountsStore = createAppSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(accountsApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.token = payload.token;
    });
  },
});

export default accountsStore.reducer;

export const selectCurrentUser = (state: RootState) => state.accounts.userInfo;
