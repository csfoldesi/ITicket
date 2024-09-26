import { useParams } from "react-router-dom";
import { useGetVenueDetailQuery } from "./venuesApi";
import VenueEventList from "../events/VenueEventList";

const VenueDetails = () => {
  let { id } = useParams<{ id: string }>();
  const { data: venue, error, isLoading } = useGetVenueDetailQuery(id ?? "");

  if (error) return <p>Error happened</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h1>{venue?.name}</h1>
      <p>{venue?.description}</p>
      <p>
        {venue?.address.zipCode}, {venue?.address.city}, {venue?.address.street}
      </p>
      {id && <VenueEventList venueId={id!} />}
    </>
  );
};

export default VenueDetails;
