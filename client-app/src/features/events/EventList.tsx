import { Container } from "@mui/material";
import { useGetEventsListQuery } from "./eventsApi";

const EventList = () => {
  const { data, error, isLoading } = useGetEventsListQuery("");

  if (error) return <p>Error happened</p>;

  return (
    <Container>
      <h1>Events</h1>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        data?.map((event) => (
          <div key={event.id}>
            <p>{event.title}</p>
            <p>{event.dateTime.toString()}</p>
            <p>{event.description}</p>
            <p>{event.venue.name}</p>
          </div>
        ))
      )}
    </Container>
  );
};

export default EventList;
