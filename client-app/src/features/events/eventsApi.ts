import { BaseApi } from "../../app/baseApi";
import { Event } from "../../app/models/event";

export const eventsApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEventsList: builder.query<Event[], string>({
      query: () => "events",
    }),
  }),
  overrideExisting: false,
});

export const { useGetEventsListQuery } = eventsApi;
