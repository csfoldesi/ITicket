import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/store/createAppSlice";
import { TicketType } from "../../app/models/ticketModels";

type EventTickets = {
  eventId: string;
  tickets: TicketType[];
};

export interface ShoppingCartState {
  tickets: EventTickets[];
}

const initialState: ShoppingCartState = { tickets: [] };

export const shoppingCartStore = createAppSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<{ eventId: string; price: number; quantity: number }>) => {
      const { eventId, price, quantity } = action.payload;

      let eventTickets = state.tickets.find((t) => t.eventId === eventId);
      if (!eventTickets) {
        eventTickets = { eventId, tickets: [] };
        state.tickets.push(eventTickets);
      }

      let ticket = eventTickets.tickets.find((ticket) => ticket.price === price);
      if (!ticket) {
        eventTickets.tickets.push({ price, quantity });
      } else {
        ticket.quantity += quantity;
      }
    },
  },
  selectors: {
    selectTickets: (state) => state.tickets,
    selectTicketsCount: (state) =>
      state.tickets.reduce((acc, curr) => acc + curr.tickets.reduce((a, c) => a + c.quantity, 0), 0),
  },
});

export const { addTicket } = shoppingCartStore.actions;
export const { selectTickets, selectTicketsCount } = shoppingCartStore.selectors;
export default shoppingCartStore.reducer;
