import { RefreshTokenApi } from "../../app/api/BaseApi";
import { Account } from "../../app/models/account";
import { createAppSlice } from "../../app/store/createAppSlice";
import { accountsApi } from "./accountsApi";

export interface AccountsState {
  userInfo: Account | null;
}

const initialState: AccountsState = {
  userInfo: null,
};

export const accountsStore = createAppSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("account");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(accountsApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.userInfo = payload;
      saveUserInfoToLocalStorage(payload);
    });
    builder.addMatcher(accountsApi.endpoints.register.matchFulfilled, (state, { payload }) => {
      state.userInfo = payload;
      saveUserInfoToLocalStorage(payload);
    });
    builder.addMatcher(RefreshTokenApi.endpoints.refresh.matchFulfilled, (state, { payload }) => {
      state.userInfo = payload;
      saveUserInfoToLocalStorage(payload);
    });
  },
  selectors: {
    selectCurrentUser: (state) => state.userInfo,
  },
});

const saveUserInfoToLocalStorage = (account: Account) => {
  const userinfoToStorage = {
    id: account.id,
    email: account.email,
    refreshToken: account.refreshToken,
    roles: account.roles,
  };
  localStorage.setItem("account", JSON.stringify(userinfoToStorage));
};

export const { logout } = accountsStore.actions;

export default accountsStore.reducer;
