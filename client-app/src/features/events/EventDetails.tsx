import { useParams } from "react-router-dom";
import { useGetEventDetailQuery } from "./eventsApi";
import VenueEventList from "./VenueEventList";

const EventDetails = () => {
  let { id } = useParams<{ id: string }>();
  const { data: event, error, isLoading } = useGetEventDetailQuery(id ?? "");

  if (error) return <p>Error happened</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h1>{event?.title}</h1>
      <p>{event?.description}</p>
      <p>
        {event?.venue.name} - {event?.dateTime.toString()}
      </p>
    </>
  );
};

export default EventDetails;
