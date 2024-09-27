import { BaseApi, ListResponse } from "../../app/baseApi";
import { Venue } from "../../app/models/venue";

export const venuesApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVenuesList: builder.query<ListResponse<Venue>, number | void>({
      query: (page) => {
        return {
          url: "venues",
          params: { pageNumber: page },
        };
      },
    }),
    getVenueDetail: builder.query<Venue, string>({
      query: (id) => `venues/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetVenuesListQuery, useGetVenueDetailQuery } = venuesApi;
