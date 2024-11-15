import { useNavigate, useParams } from "react-router-dom";
import { useDeleteEventMutation, useEditEventMutation, useGetEventDetailQuery } from "./eventsApi";
import { Button, Container, Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import React from "react";
import CreateEditEventForm from "./forms/CreateEditEventForm";
import { Event, EventModel } from "../../app/models/eventModels";
import AlertDialog from "../core/AlertDialog";
import Error from "../core/Error";
import EventTicketsAdmin from "../tickets/EvenTicketsAdmin";
import EventTickets from "../tickets/EventTickets";

interface Props {
  adminMode?: boolean;
}

const EventDetails = ({ adminMode }: Props) => {
  let { id } = useParams<{ id: string }>();
  const { data: event, error, isLoading } = useGetEventDetailQuery(id ?? "");
  const [editEvent] = useEditEventMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [alertOpen, setAlertOpen] = React.useState(false);
  const handleAlertSubmit = async () => {
    setAlertOpen(false);
    await deleteEvent(event!.id!);
    navigate("/events");
  };

  const onSubmit = async (event: EventModel) => {
    await editEvent(Event.EventModel_CreateEventModel(event));
    handleClose();
  };

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading) return <p>Loading...</p>;

  if (!event) return <></>;

  return (
    <Container>
      <h1>{event?.title}</h1>
      <p>{event?.description}</p>
      <p>
        {event?.venue.name} - {event?.dateTime.toString()}
      </p>
      <Divider />
      {!adminMode && <EventTickets eventId={event.id!} />}
      {adminMode && (
        <>
          <Button variant="contained" onClick={handleOpen} sx={{ marginRight: "1em" }}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={() => setAlertOpen(true)}>
            Delete
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit event</DialogTitle>
            <DialogContent>
              <CreateEditEventForm onSubmit={onSubmit} onCancel={handleClose} event={event} />
            </DialogContent>
          </Dialog>
          <AlertDialog
            title="Delete event"
            description="Do you really want to delete this event?"
            open={alertOpen}
            onCancel={() => {
              setAlertOpen(false);
            }}
            onSubmit={handleAlertSubmit}
          />
          <EventTicketsAdmin eventId={event.id!} />
        </>
      )}
    </Container>
  );
};

export default EventDetails;
