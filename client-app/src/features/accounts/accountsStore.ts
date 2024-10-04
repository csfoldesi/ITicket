import { Account } from "../../app/models/account";
import { createAppSlice } from "../../app/store/createAppSlice";
//import { RootState } from "../../app/store/store";
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
      localStorage.setItem("account", JSON.stringify(payload));
    });
    builder.addMatcher(accountsApi.endpoints.register.matchFulfilled, (state, { payload }) => {
      state.userInfo = payload;
      localStorage.setItem("account", JSON.stringify(payload));
    });
  },
  selectors: {
    selectCurrentUser: (state) => state.userInfo,
  },
});

export const { logout } = accountsStore.actions;

export default accountsStore.reducer;

//export const { selectCurrentUser } = accountsStore.selectors;
//export const selectCurrentUser = (state: RootState) => state.accounts.userInfo;
