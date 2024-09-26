import { BaseApi } from "../../app/baseApi";
import { Venue } from "../../app/models/venue";

export const venuesApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVenuesList: builder.query<Venue[], string>({
      query: () => "venues",
    }),
    getVenueDetail: builder.query<Venue, string>({
      query: (id) => `venues/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetVenuesListQuery, useGetVenueDetailQuery } = venuesApi;
