import React from "react";
import { Container } from "@mui/material";
import { eventsApi } from "./eventsApi";
import EventListItem from "./EventListItem";
import EndlessList from "../core/EndlessList";
import Error from "../core/Error";

const EventList = () => {
  const [page, setPage] = React.useState(0);
  const { data: eventList, error, isLoading } = eventsApi.useGetEventsListQuery({ pageNumber: page });

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  if (error) {
    return <Error error={error} />;
  }
  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <h1>Events</h1>
      <EndlessList
        dataList={eventList}
        nextPage={nextPage}
        isLoading={isLoading}
        render={(event, index) => <EventListItem event={event} key={event.id} />}
      />
    </Container>
  );
};

export default EventList;
