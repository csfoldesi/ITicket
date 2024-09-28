//import { Box, Container, IconButton } from "@mui/material";
//import { loadAsync, selectVenueList } from "./venuesStore";
//import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetVenuesListQuery } from "./venuesApi";
import VenueListItem from "./VenueListItem";
import React from "react";
import { Virtuoso } from "react-virtuoso";
import { Venue } from "../../app/models/venue";

const VenueList = () => {
  const [page, setPage] = React.useState(0);
  const [venueList, setVenueList] = React.useState<Venue[]>(() => []);
  const { data, error, isLoading } = useGetVenuesListQuery(page);

  React.useEffect(() => {
    if (data?.items) {
      setVenueList((prev) => [...prev, ...data.items]);
    }
  }, [data]);

  const loadMore = React.useCallback(() => {
    if (isLoading || !data?.totalPages || page >= data?.totalPages) {
      return;
    }
    return setTimeout(() => {
      setPage((prev) => prev + 1);
    }, 500);
  }, [isLoading, setPage, page, data?.totalPages]);

  const hasMoreData = () => {
    return !data || page + 1 < data?.totalPages;
  };

  const Footer = () => {
    return (
      <>
        {hasMoreData() && (
          <div
            style={{
              padding: "2rem",
              display: "flex",
              justifyContent: "center",
            }}>
            Loading...
          </div>
        )}
      </>
    );
  };

  /*const dispatch = useAppDispatch();
  const venuesList = useAppSelector(selectVenueList);
  console.log(venuesList);

  useEffect(() => {
    dispatch(loadAsync());
  }, [dispatch]);*/

  if (error) return <p>Error happened</p>;
  if (isLoading) return <p>Loading...</p>;

  /*return (
    <Container>
      <Box>
        <IconButton onClick={() => setPage((prev) => prev - 1)} disabled={page === 0}>
          <ArrowLeftIcon />
        </IconButton>
        {`${page + 1} / ${data?.totalPages}`}
        <IconButton onClick={() => setPage((prev) => prev + 1)} disabled={page + 1 === data?.totalPages}>
          <NavigateNextIcon />
        </IconButton>
      </Box>
      <h1>Venues</h1>
      {isLoading ? <p>Loading</p> : data?.items.map((venue) => <VenueListItem venue={venue} key={venue.id} />)}
    </Container>
  );*/

  return (
    <>
      <h1>Venues</h1>
      {data && (
        <Virtuoso
          useWindowScroll
          data={venueList}
          endReached={loadMore}
          increaseViewportBy={200}
          itemContent={(index, venue: Venue) => <VenueListItem venue={venue} key={venue.id} />}
          components={{ Footer }}
        />
      )}
    </>
  );
};

export default VenueList;
