import { createAppSlice } from "../../app/store/createAppSlice";
import { VenueModel } from "../../app/models/venueModels";
import { venuesApi } from "./venuesApi";

export interface VenuesState {
  venueList: VenueModel[];
  currentPage: number;
  hasMorePages: boolean;
}

const initialState: VenuesState = {
  venueList: [],
  currentPage: 0,
  hasMorePages: true,
};

export const venuesStore = createAppSlice({
  name: "venues",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.currentPage += 1;
    },
  },
  /*extraReducers: (builder) => {
    builder.addMatcher(venuesApi.endpoints.getVenuesList.matchFulfilled, (state, { payload }) => {
      state.venueList = [...state.venueList, ...payload.items];
      state.hasMorePages = payload.currentPage < payload.totalPages - 1;
      state.currentPage = payload.currentPage;
    });
  },*/
  selectors: {
    selectVenueList: (venues) => venues.venueList,
    selectHasMorePages: (events) => events.hasMorePages,
    selectCurrentPage: (events) => events.currentPage,
  },
});

export const { nextPage } = venuesStore.actions;
export const { selectVenueList, selectHasMorePages, selectCurrentPage } = venuesStore.selectors;

export default venuesStore.reducer;
