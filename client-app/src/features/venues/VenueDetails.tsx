import React from "react";
import { useParams } from "react-router-dom";
import { useGetVenueDetailQuery } from "./venuesApi";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useCreateEventMutation } from "../events/eventsApi";
import { CreateEvent } from "../../app/models/event";
import VenueEventList from "../events/VenueEventList";
import CreateEventForm from "../events/forms/CreateEventForm";

const VenueDetails = () => {
  let { id: venueId } = useParams<{ id: string }>();
  const { data: venue, error, isLoading } = useGetVenueDetailQuery(venueId ?? "");
  const [createUser] = useCreateEventMutation();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (createEvent: CreateEvent) => {
    createEvent.venueId = venueId!;
    await createUser(createEvent);
    handleClose();
  };

  if (error) return <p>Error happened</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h1>{venue?.name}</h1>
      <p>{venue?.description}</p>
      <p>
        {venue?.address.zipCode}, {venue?.address.city}, {venue?.address.street}
      </p>
      <Button variant="contained" onClick={handleOpen}>
        New Event
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new event</DialogTitle>
        <DialogContent>
          <CreateEventForm venueId={venueId} onSubmit={onSubmit} onCancel={handleClose} />
        </DialogContent>
      </Dialog>
      {venueId && <VenueEventList venueId={venueId!} />}
    </>
  );
};

export default VenueDetails;
