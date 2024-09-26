import { Container } from "@mui/material";
//import { useEffect } from "react";
//import { loadAsync, selectVenueList } from "./venuesStore";
//import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetVenuesListQuery } from "./venuesApi";
import VenueListItem from "./VenueListItem";

const VenueList = () => {
  const { data, error, isLoading } = useGetVenuesListQuery("");

  /*const dispatch = useAppDispatch();
  const venuesList = useAppSelector(selectVenueList);
  console.log(venuesList);

  useEffect(() => {
    dispatch(loadAsync());
  }, [dispatch]);*/

  if (error) return <p>Error happened</p>;

  return (
    <Container>
      <h1>Venues</h1>
      {isLoading ? <p>Loading</p> : data?.map((venue) => <VenueListItem venue={venue} key={venue.id} />)}
    </Container>
  );
};

export default VenueList;
