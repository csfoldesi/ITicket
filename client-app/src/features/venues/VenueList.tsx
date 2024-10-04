import { venuesApi } from "./venuesApi";
import VenueListItem from "./VenueListItem";
import React from "react";
import EndlessList from "../core/EndlessList";

const VenueList = () => {
  const [page, setPage] = React.useState(0);
  const { data: venueList, error, isLoading } = venuesApi.useGetVenuesListQuery({ pageNumber: page });

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  if (error) return <p>Error happened</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h1>Venues</h1>
      <EndlessList
        dataList={venueList}
        nextPage={nextPage}
        isLoading={isLoading}
        render={(venue, index) => <VenueListItem venue={venue} key={venue.id} />}
      />
    </>
  );
};

export default VenueList;
