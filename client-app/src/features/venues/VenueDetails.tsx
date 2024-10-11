import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteVenueMutation, useEditVenueMutation, useGetVenueDetailQuery } from "./venuesApi";
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useCreateEventMutation } from "../events/eventsApi";
import { Event, EventModel } from "../../app/models/eventModels";
import VenueEventList from "../events/VenueEventList";
import CreateEditEventForm from "../events/forms/CreateEditEventForm";
import CreateEditVenueForm from "./forms/CreateEditVenueForm";
import { Venue, VenueModel } from "../../app/models/venueModels";
import AlertDialog from "../core/AlertDialog";

const VenueDetails = () => {
  let { id: venueId } = useParams<{ id: string }>();
  const { data: venue, error, isLoading } = useGetVenueDetailQuery(venueId ?? "");
  const [createEvent] = useCreateEventMutation();
  const [editVenue] = useEditVenueMutation();
  const [deleteVenue] = useDeleteVenueMutation();
  const navigate = useNavigate();

  const [eventOpen, setEventOpen] = React.useState(false);
  const handleEventOpen = () => setEventOpen(true);
  const handleEventClose = () => setEventOpen(false);

  const [venueOpen, setVenueOpen] = React.useState(false);
  const handleVenueOpen = () => setVenueOpen(true);
  const handleVenueClose = () => setVenueOpen(false);

  const [alertOpen, setAlertOpen] = React.useState(false);
  const handleAlertSubmit = async () => {
    setAlertOpen(false);
    await deleteVenue(venue!.id!);
    navigate("/venues");
  };

  const onEventSubmit = async (event: EventModel) => {
    await createEvent(Event.EventModel_CreateEventModel(event));
    handleEventClose();
  };

  const onVenueSubmit = async (venue: VenueModel) => {
    await editVenue(Venue.VenueModel_CreateVenueModel(venue));
    handleVenueClose();
  };

  if (error) return <p>Error happened</p>;

  if (isLoading) return <p>Loading...</p>;

  if (!venue) return <></>;

  return (
    <>
      <h1>{venue?.name}</h1>
      <p>{venue?.description}</p>
      <p>
        {venue?.address.zipCode}, {venue?.address.city}, {venue?.address.street}
      </p>
      <Box component={"div"}>
        <Button variant="contained" onClick={handleVenueOpen} sx={{ marginRight: "1em" }}>
          Edit Venue
        </Button>
        <Button variant="contained" color="error" onClick={() => setAlertOpen(true)} sx={{ marginRight: "1em" }}>
          Delete Venue
        </Button>
        <Button variant="contained" onClick={handleEventOpen} startIcon={<AddIcon />}>
          New Event
        </Button>
      </Box>
      <Dialog open={eventOpen} onClose={handleEventClose}>
        <DialogTitle>Create new event</DialogTitle>
        <DialogContent>
          <CreateEditEventForm
            onSubmit={onEventSubmit}
            onCancel={handleEventClose}
            event={{ ...Event.EventModel(), venue: venue }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={venueOpen} onClose={handleVenueClose}>
        <DialogTitle>Edit Venue</DialogTitle>
        <DialogContent>
          <CreateEditVenueForm onSubmit={onVenueSubmit} onCancel={handleVenueClose} venue={venue} />
        </DialogContent>
      </Dialog>
      <AlertDialog
        title="Delete venue"
        description="Do you really want to delete this venua and all of its events?"
        open={alertOpen}
        onCancel={() => {
          setAlertOpen(false);
        }}
        onSubmit={handleAlertSubmit}
      />
      {venueId && <VenueEventList venueId={venueId!} />}
    </>
  );
};

export default VenueDetails;
