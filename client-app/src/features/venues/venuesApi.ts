import { BaseApi, ListResponse, PagedQuery } from "../../app/baseApi";
import { VenueModel } from "../../app/models/venueModels";

export const venuesApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVenuesList: builder.query<ListResponse<VenueModel>, PagedQuery>({
      query: (arg) => {
        return {
          url: "venues",
          params: { ...arg },
        };
      },
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
    }),
  }),
  overrideExisting: false,
});

export const { useGetVenuesListQuery, useGetVenueDetailQuery } = venuesApi;
