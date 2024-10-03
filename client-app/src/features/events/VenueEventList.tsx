import { Container } from "@mui/material";
import { eventsApi } from "./eventsApi";
import EventListItem from "./EventListItem";
import React from "react";
import { Event } from "../../app/models/event";
import { Virtuoso } from "react-virtuoso";
import EndlessListFooter from "../core/EndlessListFooter";

interface Props {
  venueId: string;
}

const VenueEventList = ({ venueId }: Props) => {
  const [page, setPage] = React.useState(0);
  const { data: eventList, error, isLoading } = eventsApi.useGetEventsListQuery({ pageNumber: page, venue: venueId });

  const loadMore = React.useCallback(() => {
    if (isLoading || !eventList?.hasMorePages) {
      return;
    }
    return setTimeout(() => {
      setPage((prev) => prev + 1);
    }, 500);
  }, [isLoading, eventList?.hasMorePages]);

  if (error) return <p>Error happened</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      {eventList && (
        <Virtuoso
          useWindowScroll
          data={eventList.items}
          endReached={loadMore}
          increaseViewportBy={200}
          itemContent={(index, event: Event) => <EventListItem event={event} key={event.id} />}
          components={{ Footer: () => <EndlessListFooter hasMorePages={eventList.hasMorePages} /> }}
        />
      )}
    </Container>
  );
};

export default VenueEventList;
