import { EventModel } from "../../app/models/eventModels";
import { createAppSlice } from "../../app/store/createAppSlice";

interface EventsState {
  eventList: EventModel[];
  currentPage: number;
  hasMorePages: boolean;
}

const initialState: EventsState = {
  eventList: [],
  currentPage: 0,
  hasMorePages: true,
};

export const eventsStore = createAppSlice({
  name: "events",
  initialState,
  reducers: {
    reset: (state) => {
      state.currentPage = 0;
    },
    nextPage: (state) => {
      state.currentPage += 1;
    },
  },
  selectors: {
    selectEventList: (events) => events.eventList,
    selectHasMorePages: (events) => events.hasMorePages,
    selectCurrentPage: (events) => events.currentPage,
  },
});

export const { nextPage, reset } = eventsStore.actions;
export const { selectEventList, selectHasMorePages, selectCurrentPage } = eventsStore.selectors;

export default eventsStore.reducer;
