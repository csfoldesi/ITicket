import { ApiResponse, BaseApi, ListResponse, PagedQuery } from "../../app/api/BaseApi";
import { CreateVenueModel, VenueModel } from "../../app/models/venueModels";

export interface VenuesQuery extends PagedQuery {
  name?: string;
  isOwnedOnly?: boolean;
}

export const venuesApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVenuesList: builder.query<ListResponse<VenueModel>, VenuesQuery>({
      query: (args) => {
        return {
          url: args.isOwnedOnly ? "venues/owned" : "venues",
          params: { ...args },
        };
      },
      providesTags: ["Venue"],
      transformResponse: (response: ApiResponse<ListResponse<VenueModel>>): ListResponse<VenueModel> => {
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
    getVenueDetail: builder.query<VenueModel, string>({
      query: (id) => `venues/${id}`,
      providesTags: ["Venue"],
      transformResponse: (response: ApiResponse<VenueModel>): VenueModel => response.data!,
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
      transformResponse: (response: ApiResponse<VenueModel>): VenueModel => response.data!,
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
      transformResponse: (response: ApiResponse<VenueModel>): VenueModel => response.data!,
      invalidatesTags: ["Venue"],
    }),
    deleteVenue: builder.mutation<void, string>({
      query: (id) => {
        return {
          url: `venues/${id}`,
          method: "delete",
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

export const {
  useGetVenuesListQuery,
  useGetVenueDetailQuery,
  useCreateVenueMutation,
  useEditVenueMutation,
  useDeleteVenueMutation,
} = venuesApi;
