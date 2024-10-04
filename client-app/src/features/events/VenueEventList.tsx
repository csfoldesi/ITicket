import { Container } from "@mui/material";
import { eventsApi } from "./eventsApi";
import EventListItem from "./EventListItem";
import React from "react";
import EndlessList from "../core/EndlessList";

interface Props {
  venueId: string;
}

const VenueEventList = ({ venueId }: Props) => {
  const [page, setPage] = React.useState(0);
  const { data: eventList, error, isLoading } = eventsApi.useGetEventsListQuery({ pageNumber: page, venue: venueId });

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  if (error) return <p>Error happened</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <EndlessList
        dataList={eventList}
        nextPage={nextPage}
        isLoading={isLoading}
        render={(event, index) => <EventListItem event={event} key={event.id} />}
      />
    </Container>
  );
};

export default VenueEventList;
