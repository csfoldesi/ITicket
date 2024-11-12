export type TicketType = {
  price: number;
  quantity: number;
};

export type CreateTicketModel = {
  eventId: string;
  price: number;
  quantity: number;
  status?: string;
};
