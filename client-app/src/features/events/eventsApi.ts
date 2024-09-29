import { BaseApi, ListResponse } from "../../app/baseApi";
import { CreateEvent, Event } from "../../app/models/event";

interface EventQueryParams {
  venue?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export const eventsApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEventsList: builder.query<ListResponse<Event>, EventQueryParams>({
      query: (arg) => {
        const { venue, dateFrom, dateTo } = arg;
        return {
          url: "events",
          params: { venue, dateFrom, dateTo },
        };
      },
      providesTags: ["Event"],
    }),
    getEventDetail: builder.query<Event, string>({
      query: (id) => `events/${id}`,
    }),
    createEvent: builder.mutation<Event, CreateEvent>({
      query: (createEvent) => {
        return {
          url: "events",
          method: "post",
          body: createEvent,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["Event"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetEventsListQuery, useGetEventDetailQuery, useCreateEventMutation } = eventsApi;
