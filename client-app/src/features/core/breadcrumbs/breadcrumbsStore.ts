import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../../app/store/createAppSlice";
import { venuesApi } from "../../venues/venuesApi";
import { eventsApi } from "../../events/eventsApi";

interface BreadcrumbsState {
  items: { [key: string]: string };
}

const initialState: BreadcrumbsState = {
  items: {},
};

export const breadcrumbsStore = createAppSlice({
  name: "breadcrumbs",
  initialState,
  reducers: {
    addBreadcrumbsItem: (state, action: PayloadAction<{ key: string; value: string }>) => {
      state.items = { ...state.items, ...{ [action.payload.key]: action.payload.value } };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(venuesApi.endpoints.getVenueDetail.matchFulfilled, (state, { payload }) => {
      state.items = { ...state.items, ...{ ["venue" + payload.id!]: payload.name } };
    });
    builder.addMatcher(eventsApi.endpoints.getEventDetail.matchFulfilled, (state, { payload }) => {
      state.items = { ...state.items, ...{ ["event" + payload.id!]: payload.title } };
    });
  },
  selectors: {
    selectBreadcrumbsItem: (state, key: string) => state.items[key],
  },
});

export const { addBreadcrumbsItem } = breadcrumbsStore.actions;
export const { selectBreadcrumbsItem } = breadcrumbsStore.selectors;

export default breadcrumbsStore.reducer;
