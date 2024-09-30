import { Container } from "@mui/material";
import { useGetEventsListQuery } from "./eventsApi";
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
  const [eventList, setEventList] = React.useState<Event[]>(() => []);

  const { data, error, isLoading } = useGetEventsListQuery({ venue: venueId, pageNumber: page });

  React.useEffect(() => {
    if (data?.items) {
      setEventList((prev) => [...prev, ...data.items]);
    }
  }, [data]);

  const loadMore = React.useCallback(() => {
    if (isLoading || !data?.hasMorePages) {
      return;
    }
    return setTimeout(() => {
      setPage((prev) => prev + 1);
    }, 500);
  }, [isLoading, setPage, data?.hasMorePages]);
  
  
  if (error) return <p>Error happened</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      {data && (
        <Virtuoso
          useWindowScroll
          data={eventList}
          endReached={loadMore}
          increaseViewportBy={200}
          itemContent={(index, event: Event) => <EventListItem event={event} key={event.id} />}
          components={{ Footer: () => <EndlessListFooter hasMorePages={data?.hasMorePages} /> }}
        />
      )}
    </Container>
  );
};

export default VenueEventList;
