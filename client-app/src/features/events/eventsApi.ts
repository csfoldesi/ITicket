import { ApiResponse, BaseApi, ListResponse, PagedQuery } from "../../app/api/BaseApi";
import { CreateEventModel, EventModel } from "../../app/models/eventModels";

export interface EventsQuery extends PagedQuery {
  venue?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const eventsApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEventsList: builder.query<ListResponse<EventModel>, EventsQuery>({
      query: (arg) => {
        return {
          url: "events",
          params: { ...arg },
        };
      },
      providesTags: ["Event"],
      transformResponse: (response: ApiResponse<ListResponse<EventModel>>): ListResponse<EventModel> => {
        return { ...response.data!, hasMorePages: response.data!.currentPage < response.data!.totalPages - 1 };
      },
      serializeQueryArgs: ({ queryArgs }) => {
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
      transformResponse: (response: ApiResponse<EventModel>): EventModel => response.data!,
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
      transformResponse: (response: ApiResponse<EventModel>): EventModel => response.data!,
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
      transformResponse: (response: ApiResponse<EventModel>): EventModel => response.data!,
    }),
    deleteEvent: builder.mutation<void, string>({
      query: (id) => {
        return {
          url: `events/${id}`,
          method: "delete",
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

export const {
  useGetEventsListQuery,
  useGetEventDetailQuery,
  useCreateEventMutation,
  useEditEventMutation,
  useDeleteEventMutation,
} = eventsApi;
