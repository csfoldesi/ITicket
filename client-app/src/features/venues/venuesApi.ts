import { BaseApi, ListResponse, PagedQuery } from "../../app/baseApi";
import { Venue } from "../../app/models/venue";

export const venuesApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVenuesList: builder.query<ListResponse<Venue>, PagedQuery>({
      query: (arg) => {
        return {
          url: "venues",
          params: { ...arg },
        };
      },
      transformResponse: (response: ListResponse<Venue>) => {
        return { ...response, hasMorePages: response.currentPage < response.totalPages - 1 };
      },
    }),
    getVenueDetail: builder.query<Venue, string>({
      query: (id) => `venues/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetVenuesListQuery, useGetVenueDetailQuery } = venuesApi;
