import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Venue } from "../../app/models/venue";

export const venuesApi = createApi({
  reducerPath: "venuesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getVenuesList: builder.query<Venue[], string>({
      query: () => "venues",
    }),
  }),
});

export const { useGetVenuesListQuery } = venuesApi;
