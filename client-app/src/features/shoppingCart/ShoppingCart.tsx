import { useSelector } from "react-redux";
import { selectTickets } from "./shoppingCartStore";
import { Container, List, ListItem } from "@mui/material";
import { EventModel } from "../../app/models/eventModels";
import { useLazyGetEventDetailQuery } from "../events/eventsApi";
import { useEffect, useState } from "react";

const ShoppingCart = () => {
  const tickets = useSelector(selectTickets);
  const [events, setEvents] = useState<EventModel[]>([]);
  const [trigger, { data, error, isLoading }] = useLazyGetEventDetailQuery();

  useEffect(() => {
    const eventIds = Array.from(new Set(tickets.map((ticket) => ticket.eventId)));
    const fetchEventDetails = async () => {
      const promises = eventIds.map((eventId) => trigger(eventId).unwrap());
      const results = await Promise.all(promises);
      setEvents(results);
    };
    fetchEventDetails();
  }, [tickets, trigger]);

  const getEvent = (eventId: string): EventModel | undefined => {
    return events.find((e) => e.id === eventId);
  };

  return (
    <Container>
      <h1>Shopping cart</h1>
      <List>
        {tickets.map((tickets, index) => (
          <>
            <ListItem key={index}>{getEvent(tickets.eventId)?.title}</ListItem>
            <List sx={{ pl: 4 }}>
              {tickets.tickets.map((ticket, i) => (
                <ListItem key={i}>
                  {ticket.price} HUF - {ticket.quantity} qty.
                </ListItem>
              ))}
            </List>
          </>
        ))}
      </List>
    </Container>
  );
};

export default ShoppingCart;
