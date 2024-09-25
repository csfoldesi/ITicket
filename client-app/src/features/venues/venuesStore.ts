import axios from "axios";
import { createAppSlice } from "../../app/store/createAppSlice";
import { Venue } from "../../app/models/venue";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export interface VenuesState {
  venueList: Venue[];
  status: "idle" | "loading" | "failed";
}

const initialState: VenuesState = {
  venueList: [],
  status: "idle",
};

export const venuesStore = createAppSlice({
  name: "venues",
  initialState,
  reducers: (create) => ({
    loadAsync: create.asyncThunk(
      async () => {
        const result = await axios.get<Venue>("/venues");
        return result.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          console.log(action.payload);
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectVenueList: (venues) => venues.venueList,
  },
});

export const { loadAsync } = venuesStore.actions;

export const { selectVenueList } = venuesStore.selectors;

export default venuesStore.reducer;
