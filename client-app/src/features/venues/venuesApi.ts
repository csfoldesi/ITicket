import { BaseApi, ListResponse, PagedQuery } from "../../app/baseApi";
import { CreateEventModel } from "../../app/models/eventModels";
import { CreateVenueModel, VenueModel } from "../../app/models/venueModels";

export const venuesApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVenuesList: builder.query<ListResponse<VenueModel>, PagedQuery>({
      query: (arg) => {
        return {
          url: "venues",
          params: { ...arg },
        };
      },
      providesTags: ["Venue"],
      transformResponse: (response: ListResponse<VenueModel>) => {
        return { ...response, hasMorePages: response.currentPage < response.totalPages - 1 };
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
    getVenueDetail: builder.query<VenueModel, string>({
      query: (id) => `venues/${id}`,
      providesTags: ["Venue"],
    }),
    createVenue: builder.mutation<VenueModel, CreateVenueModel>({
      query: (data) => {
        return {
          url: "venues",
          method: "post",
          body: data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["Venue"],
    }),
    editVenue: builder.mutation<VenueModel, CreateVenueModel>({
      query: (data) => {
        return {
          url: `venues/${data.id}`,
          method: "put",
          body: data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["Venue"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetVenuesListQuery, useGetVenueDetailQuery, useCreateVenueMutation, useEditVenueMutation } =
  venuesApi;
