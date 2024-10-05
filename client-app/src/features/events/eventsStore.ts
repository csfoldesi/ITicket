import { EventModel } from "../../app/models/eventModels";
import { createAppSlice } from "../../app/store/createAppSlice";
import { eventsApi } from "./eventsApi";

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
  /*extraReducers: (builder) => {
    builder.addMatcher(eventsApi.endpoints.getEventsList.matchFulfilled, (state, { payload }) => {
      state.eventList = [...state.eventList, ...payload.items];
      state.hasMorePages = payload.currentPage < payload.totalPages - 1;
      state.currentPage = payload.currentPage;
    });
  },*/
  selectors: {
    selectEventList: (events) => events.eventList,
    selectHasMorePages: (events) => events.hasMorePages,
    selectCurrentPage: (events) => events.currentPage,
  },
});

export const { nextPage, reset } = eventsStore.actions;
export const { selectEventList, selectHasMorePages, selectCurrentPage } = eventsStore.selectors;

export default eventsStore.reducer;
