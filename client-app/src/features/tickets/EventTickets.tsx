import { CardContent, CardHeader, Container, Fab, List, ListItem } from "@mui/material";
import { useGetEventTicketsQuery } from "./ticketsApi";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState } from "react";
import QuantityControl from "../core/QuantityControl";
import { useAppDispatch } from "../../app/store/hooks";
import { addTicket, selectTicketsCount } from "../shoppingCart/shoppingCartStore";
import { useSelector } from "react-redux";

interface Props {
  eventId: string;
}

const EventTickets = ({ eventId }: Props) => {
  const { data: tickets, error, isLoading } = useGetEventTicketsQuery(eventId);
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const ticketsCount = useSelector(selectTicketsCount);

  useEffect(() => {
    setSelectedTickets(new Array(tickets?.length).fill(0));
  }, [tickets]);

  const onTicketQuantityChange = (index: number, value: number) => {
    setSelectedTickets((prevSelectedTickets) => prevSelectedTickets.map((s, i) => (i === index ? value : s)));
  };

  const onAddShoppingCart = (index: number) => {
    if (tickets && selectedTickets) {
      const price = tickets[index].price;
      const quantity = selectedTickets[index];
      dispatch(addTicket({ eventId, price, quantity }));
    }
  };

  if (!tickets) return <></>;

  return (
    <Container>
      <CardHeader title="Tickets" />
      <CardContent>
        <p>{ticketsCount}</p>
        <List>
          {tickets.map((ticketType, index) => (
            <ListItem key={index}>
              {ticketType.price} HUF
              <QuantityControl index={index} value={selectedTickets[index]} onChange={onTicketQuantityChange} />
              <Fab
                size="small"
                color="primary"
                aria-label="add to shopping cart"
                onClick={() => onAddShoppingCart(index)}>
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
