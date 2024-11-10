import { ApiResponse, BaseApi } from "../../app/api/BaseApi";
import { TicketType } from "../../app/models/ticketModels";

export const ticketsApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEventTicketsForAdministration: builder.query<TicketType[], string>({
      query: (eventId) => {
        return {
          url: `tickets/${eventId}`,
        };
      },
      transformResponse: (response: ApiResponse<TicketType[]>): TicketType[] => response.data!,
    }),
  }),
  overrideExisting: false,
});

export const { useGetEventTicketsForAdministrationQuery } = ticketsApi;
