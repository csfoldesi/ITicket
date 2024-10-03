import { BaseApi, ListResponse, PagedQuery } from "../../app/baseApi";
import { CreateEvent, Event } from "../../app/models/event";

interface EventQueryParams extends PagedQuery {
  venue?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export const eventsApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEventsList: builder.query<ListResponse<Event>, EventQueryParams>({
      query: (arg) => {
        return {
          url: "events",
          params: { ...arg },
        };
      },
      providesTags: ["Event"],
      transformResponse: (response: ListResponse<Event>) => {
        return { ...response, hasMorePages: response.currentPage < response.totalPages - 1 };
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return { ...queryArgs, pageNumber: 0 };
      },
      merge: (currentCache, newItems, { arg }) => {
        if (currentCache.items && arg.pageNumber !== 0) {
          return { ...currentCache, ...newItems, items: [...currentCache.items, ...newItems.items] };
        }
        return newItems;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
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
