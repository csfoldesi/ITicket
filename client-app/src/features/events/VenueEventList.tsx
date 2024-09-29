import { Container } from "@mui/material";
import { useGetEventsListQuery } from "./eventsApi";
import EventListItem from "./EventListItem";

interface Props {
  venueId: string;
}

const VenueEventList = ({ venueId }: Props) => {
  const { data: eventList, error, isLoading } = useGetEventsListQuery({ venue: venueId });

  if (error) return <p>Error happened</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      {eventList?.items.map((event) => (
        <EventListItem event={event} key={event.id} />
      ))}
    </Container>
  );
};

export default VenueEventList;
