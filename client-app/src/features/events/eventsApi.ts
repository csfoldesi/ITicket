import { BaseApi } from "../../app/baseApi";
import { Event } from "../../app/models/event";

type EventQueryParams = {
  venue?: string;
  dateFrom?: Date;
  dateTo?: Date;
};

export const eventsApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEventsList: builder.query<Event[], EventQueryParams>({
      query: (arg) => {
        const { venue, dateFrom, dateTo } = arg;
        return {
          url: "events/",
          params: { venue, dateFrom, dateTo },
        };
      },
    }),
    getEventDetail: builder.query<Event, string>({
      query: (id) => `events/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetEventsListQuery, useGetEventDetailQuery } = eventsApi;
