import { ApiResponse, BaseApi } from "../../app/api/BaseApi";
import { CreateTicketModel, TicketType } from "../../app/models/ticketModels";

export const ticketsApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEventTicketsForAdministration: builder.query<TicketType[], string>({
      query: (eventId) => {
        return {
          url: `tickets/admin/${eventId}`,
        };
      },
      transformResponse: (response: ApiResponse<TicketType[]>): TicketType[] => response.data!,
      providesTags: ["Ticket"],
    }),
    getEventTickets: builder.query<TicketType[], string>({
      query: (eventId) => {
        return {
          url: `tickets/${eventId}`,
        };
      },
      transformResponse: (response: ApiResponse<TicketType[]>): TicketType[] => response.data!,
      providesTags: ["Ticket"],
    }),
    createTicket: builder.mutation<{}, CreateTicketModel>({
      query: (createTicket) => {
        return {
          url: `tickets/${createTicket.eventId}`,
          method: "post",
          body: createTicket,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["Ticket"],
      transformResponse: (response: ApiResponse<{}>): {} => response.data!,
    }),
  }),
  overrideExisting: false,
});

export const { useGetEventTicketsForAdministrationQuery, useGetEventTicketsQuery, useCreateTicketMutation } =
  ticketsApi;
