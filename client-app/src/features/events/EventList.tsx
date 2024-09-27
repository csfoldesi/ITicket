import { Container } from "@mui/material";
import { useGetEventsListQuery } from "./eventsApi";
import EventListItem from "./EventListItem";

const EventList = () => {
  const { data, error, isLoading } = useGetEventsListQuery({});

  if (error) return <p>Error happened</p>;

  return (
    <Container>
      <h1>Events</h1>
      {isLoading ? <p>Loading</p> : data?.items.map((event) => <EventListItem event={event} key={event.id} />)}
    </Container>
  );
};

export default EventList;
