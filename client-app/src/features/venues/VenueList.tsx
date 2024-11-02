import { venuesApi, VenuesQuery } from "./venuesApi";
import VenueListItem from "./VenueListItem";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import EndlessList from "../core/EndlessList";
import { Button, Container } from "@mui/material";
import Error from "../core/Error";
import VenueSearchView from "./VenueSearchView";
import CreateEditVenue from "./edit/CreateEditVenue";

interface Props {
  adminMode?: boolean;
}

const VenueList = ({ adminMode }: Props) => {
  const [queryParams, setQueryParams] = React.useState<VenuesQuery>({
    pageNumber: 0,
    name: "",
    isOwnedOnly: adminMode,
  });
  const { data: venueList, error, isLoading } = venuesApi.useGetVenuesListQuery(queryParams);

  const [createVenueIsOpen, setCreateVenueIsOpen] = React.useState(false);

  const nextPage = () => {
    setQueryParams((prev) => {
      return { ...prev, pageNumber: prev.pageNumber! + 1 };
    });
  };

  if (error) {
    return <Error error={error} />;
  }
  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <h1>Venues</h1>
      <VenueSearchView setQuery={setQueryParams} adminMode={adminMode}>
        {adminMode && (
          <Button variant="contained" onClick={() => setCreateVenueIsOpen(true)} startIcon={<AddIcon />}>
            New Venue
          </Button>
        )}
      </VenueSearchView>
      <EndlessList
        dataList={venueList}
        nextPage={nextPage}
        isLoading={isLoading}
        render={(venue, index) => <VenueListItem venue={venue} key={venue.id} />}
      />
      {adminMode && (
        <CreateEditVenue
          isOpen={createVenueIsOpen}
          onClose={() => {
            setCreateVenueIsOpen(false);
          }}
        />
      )}
    </Container>
  );
};

export default VenueList;
