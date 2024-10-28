import { createAppSlice } from "../../app/store/createAppSlice";
import { VenueModel } from "../../app/models/venueModels";

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
  selectors: {
    selectVenueList: (venues) => venues.venueList,
    selectHasMorePages: (events) => events.hasMorePages,
    selectCurrentPage: (events) => events.currentPage,
  },
});

export const { nextPage } = venuesStore.actions;
export const { selectVenueList, selectHasMorePages, selectCurrentPage } = venuesStore.selectors;

export default venuesStore.reducer;
