import { BaseApi, ListResponse, PagedQuery } from "../../app/baseApi";
import { CreateEventModel, EventModel } from "../../app/models/eventModels";

interface EventQueryParams extends PagedQuery {
  venue?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export const eventsApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEventsList: builder.query<ListResponse<EventModel>, EventQueryParams>({
      query: (arg) => {
        return {
          url: "events",
          params: { ...arg },
        };
      },
      providesTags: ["Event"],
      transformResponse: (response: ListResponse<EventModel>) => {
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
    getEventDetail: builder.query<EventModel, string>({
      query: (id) => `events/${id}`,
      providesTags: ["Event"],
    }),
    createEvent: builder.mutation<EventModel, CreateEventModel>({
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
    editEvent: builder.mutation<EventModel, CreateEventModel>({
      query: (data) => {
        return {
          url: `events/${data.id}`,
          method: "put",
          body: data,
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

export const { useGetEventsListQuery, useGetEventDetailQuery, useCreateEventMutation, useEditEventMutation } =
  eventsApi;
