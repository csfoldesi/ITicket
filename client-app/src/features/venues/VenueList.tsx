import { venuesApi } from "./venuesApi";
import VenueListItem from "./VenueListItem";
import React from "react";
import { Virtuoso } from "react-virtuoso";
import { Venue } from "../../app/models/venue";
import EndlessListFooter from "../core/EndlessListFooter";

const VenueList = () => {
  const [page, setPage] = React.useState(0);
  const { data: venueList, error, isLoading } = venuesApi.useGetVenuesListQuery({ pageNumber: page });

  const loadMore = React.useCallback(() => {
    if (isLoading || !venueList?.hasMorePages) {
      return;
    }
    return setTimeout(() => {
      setPage((prev) => prev + 1);
    }, 500);
  }, [isLoading, venueList?.hasMorePages]);

  if (error) return <p>Error happened</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h1>Venues</h1>
      {venueList && (
        <Virtuoso
          useWindowScroll
          data={venueList.items}
          endReached={loadMore}
          increaseViewportBy={200}
          itemContent={(index, venue: Venue) => <VenueListItem venue={venue} key={venue.id} />}
          components={{ Footer: () => <EndlessListFooter hasMorePages={venueList?.hasMorePages} /> }}
        />
      )}
    </>
  );
};

export default VenueList;
