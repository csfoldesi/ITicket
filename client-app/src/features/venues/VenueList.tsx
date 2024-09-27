import { Box, Container, IconButton } from "@mui/material";
//import { useEffect } from "react";
//import { loadAsync, selectVenueList } from "./venuesStore";
//import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetVenuesListQuery } from "./venuesApi";
import VenueListItem from "./VenueListItem";
import React from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const VenueList = () => {
  const [page, setPage] = React.useState(0);
  const { data, error, isLoading } = useGetVenuesListQuery(page);

  /*const dispatch = useAppDispatch();
  const venuesList = useAppSelector(selectVenueList);
  console.log(venuesList);

  useEffect(() => {
    dispatch(loadAsync());
  }, [dispatch]);*/

  if (error) return <p>Error happened</p>;

  return (
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
  );
};

export default VenueList;
