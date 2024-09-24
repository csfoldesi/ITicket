import { Container } from "@mui/material";
//import { useEffect } from "react";
//import { loadAsync, selectVenueList } from "./venuesStore";
//import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetVenuesListQuery } from "./venuesApi";

const VenueList = () => {
  const { data, error, isLoading } = useGetVenuesListQuery("venues");

  /*const dispatch = useAppDispatch();
  const venuesList = useAppSelector(selectVenueList);
  console.log(venuesList);

  useEffect(() => {
    dispatch(loadAsync());
  }, [dispatch]);*/

  return (
    <Container>
      <h1>Venues</h1>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        data?.map((venue) => (
          <div key={venue.id}>
            <p>{venue.name}</p>
            <p>{venue.description}</p>
            <p>
              {venue.address.zipCode}, {venue.address.city}, {venue.address.street}
            </p>
          </div>
        ))
      )}
    </Container>
  );
};

export default VenueList;
