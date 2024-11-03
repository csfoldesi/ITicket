import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useDeleteVenueMutation, useGetVenueDetailQuery } from "./venuesApi";
import { Box, Button, Container } from "@mui/material";
import { Event } from "../../app/models/eventModels";
import VenueEventList from "../events/VenueEventList";
import AlertDialog from "../core/AlertDialog";
import Error from "../core/Error";
import useIdParam from "../core/hooks/useIdParam";
import CreateEditVenue from "./edit/CreateEditVenue";
import useDialogOpenButton from "../core/hooks/useDialogOpenButton";
import CreateEditEvent from "../events/forms/CreateEditEvent";

interface Props {
  adminMode?: boolean;
}

const VenueDetails = ({ adminMode }: Props) => {
  const venueId = useIdParam();
  const { data: venue, error, isLoading } = useGetVenueDetailQuery(venueId ?? "");
  const [deleteVenue] = useDeleteVenueMutation();
  const navigate = useNavigate();

  const {
    isOpen: createEventDialogIsOpen,
    closeDialog: closeCreateEventDialog,
    OpenButton: CreateEventButton,
  } = useDialogOpenButton("New event", <AddIcon />);
  const {
    isOpen: editVenueDialogIsOpen,
    closeDialog: closeEditVenueDialog,
    OpenButton: EditVenueButton,
  } = useDialogOpenButton("Edit venue");

  const [alertOpen, setAlertOpen] = React.useState(false);
  const handleAlertSubmit = async () => {
    setAlertOpen(false);
    await deleteVenue(venue!.id!);
    navigate("/venues");
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
            <EditVenueButton />
            <Button variant="contained" color="error" onClick={() => setAlertOpen(true)} sx={{ marginRight: "1em" }}>
              Delete Venue
            </Button>
            <CreateEventButton />
          </Box>
          <CreateEditVenue
            isOpen={editVenueDialogIsOpen}
            onClose={closeEditVenueDialog}
            venue={venue}
            title="Edit Venue"
          />
          <CreateEditEvent
            isOpen={createEventDialogIsOpen}
            onClose={closeCreateEventDialog}
            event={{ ...Event.EventModel(), venue: venue }}
            title="New Event"
          />
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
