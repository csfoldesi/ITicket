import { Card, CardContent, CardHeader, Container, Fab, IconButton, List, ListItem, Paper } from "@mui/material";
import { useGetEventTicketsQuery } from "./ticketsApi";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState } from "react";
import QuantityControl from "../core/QuantityControl";

interface Props {
  eventId: string;
}

const EventTickets = ({ eventId }: Props) => {
  const { data: tickets, error, isLoading } = useGetEventTicketsQuery(eventId);
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);

  useEffect(() => {
    setSelectedTickets(new Array(tickets?.length).fill(0));
  }, [tickets]);

  const onTicketQuantityChange = (index: number, value: number) => {
    setSelectedTickets((prevSelectedTickets) => prevSelectedTickets.map((s, i) => (i === index ? value : s)));
  };

  if (!tickets) return <></>;

  return (
    <Container>
      <CardHeader title="Tickets" />
      <CardContent>
        <List>
          {tickets.map((ticketType, index) => (
            <ListItem key={index}>
              {ticketType.price} HUF
              <QuantityControl index={index} value={selectedTickets[index]} onChange={onTicketQuantityChange} />
              <Fab size="small" color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </Fab>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Container>
  );
};

export default EventTickets;
