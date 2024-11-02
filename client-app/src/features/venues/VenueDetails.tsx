import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useDeleteVenueMutation, useGetVenueDetailQuery } from "./venuesApi";
import { Box, Button, Container, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useCreateEventMutation } from "../events/eventsApi";
import { Event, EventModel } from "../../app/models/eventModels";
import VenueEventList from "../events/VenueEventList";
import CreateEditEventForm from "../events/forms/CreateEditEventForm";
import AlertDialog from "../core/AlertDialog";
import Error from "../core/Error";
import useIdParam from "../core/hooks/useIdParam";
import CreateEditVenue from "./edit/CreateEditVenue";

interface Props {
  adminMode?: boolean;
}

const VenueDetails = ({ adminMode }: Props) => {
  const venueId = useIdParam();
  const { data: venue, error, isLoading } = useGetVenueDetailQuery(venueId ?? "");
  const [createEvent] = useCreateEventMutation();
  const [deleteVenue] = useDeleteVenueMutation();
  const navigate = useNavigate();

  const [eventOpen, setEventOpen] = React.useState(false);
  const handleEventOpen = () => setEventOpen(true);
  const handleEventClose = () => setEventOpen(false);

  const [venueOpen, setVenueOpen] = React.useState(false);

  const [alertOpen, setAlertOpen] = React.useState(false);
  const handleAlertSubmit = async () => {
    setAlertOpen(false);
    await deleteVenue(venue!.id!);
    navigate("/venues");
  };

  const onCreateEvent = async (event: EventModel) => {
    await createEvent(Event.EventModel_CreateEventModel(event));
    handleEventClose();
  };

  if (error) return <Error error={error} />;

  if (isLoading) return <p>Loading...</p>;

  if (!venue) return <></>;

  return (
    <Container>
      <h1>{venue?.name}</h1>
      <p>{venue?.description}</p>
      <p>
        {venue?.address.zipCode}, {venue?.address.city}, {venue?.address.street}
      </p>
      {adminMode && (
        <>
          <Box component={"div"}>
            <Button
              variant="contained"
              onClick={() => {
                setVenueOpen(true);
              }}
              sx={{ marginRight: "1em" }}>
              Edit Venue
            </Button>
            <Button variant="contained" color="error" onClick={() => setAlertOpen(true)} sx={{ marginRight: "1em" }}>
              Delete Venue
            </Button>
            <Button variant="contained" onClick={handleEventOpen} startIcon={<AddIcon />}>
              New Event
            </Button>
          </Box>
          <CreateEditVenue
            isOpen={venueOpen}
            onClose={() => {
              setVenueOpen(false);
            }}
            venue={venue}
          />

          <Dialog open={eventOpen} onClose={handleEventClose}>
            <DialogTitle>Create new event</DialogTitle>
            <DialogContent>
              <CreateEditEventForm
                onSubmit={onCreateEvent}
                onCancel={handleEventClose}
                event={{ ...Event.EventModel(), venue: venue }}
              />
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
        </>
      )}
      {venueId && <VenueEventList venueId={venueId!} />}
    </Container>
  );
};

export default VenueDetails;
