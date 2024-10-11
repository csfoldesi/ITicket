import { useCreateVenueMutation, venuesApi } from "./venuesApi";
import VenueListItem from "./VenueListItem";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import EndlessList from "../core/EndlessList";
import { Venue, VenueModel } from "../../app/models/venueModels";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import CreateEditVenueForm from "./forms/CreateEditVenueForm";
import { useNavigate } from "react-router-dom";

const VenueList = () => {
  const [page, setPage] = React.useState(0);
  const { data: venueList, error, isLoading } = venuesApi.useGetVenuesListQuery({ pageNumber: page });
  const [createVenue] = useCreateVenueMutation();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (venue: VenueModel) => {
    var newVenue = await createVenue(Venue.VenueModel_CreateVenueModel(venue));
    handleClose();
    if (newVenue && newVenue.data && newVenue.data.id) {
      navigate(`/venues/${newVenue.data?.id}`);
    }
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  if (error) return <p>Error happened</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h1>Venues</h1>
      <Button variant="contained" onClick={handleOpen} startIcon={<AddIcon />}>
        New Venue
      </Button>
      <EndlessList
        dataList={venueList}
        nextPage={nextPage}
        isLoading={isLoading}
        render={(venue, index) => <VenueListItem venue={venue} key={venue.id} />}
      />
      <Dialog open={open} onClose={handleClose} maxWidth={"lg"} fullWidth>
        <DialogTitle>Create new venue</DialogTitle>
        <DialogContent>
          <CreateEditVenueForm onSubmit={onSubmit} onCancel={handleClose} venue={Venue.VenueModel()} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VenueList;
