import { useParams } from "react-router-dom";
import { useEditEventMutation, useGetEventDetailQuery } from "./eventsApi";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import CreateEditEventForm from "./forms/CreateEditEventForm";
import { Event, EventModel } from "../../app/models/eventModels";

const EventDetails = () => {
  let { id } = useParams<{ id: string }>();
  const { data: event, error, isLoading } = useGetEventDetailQuery(id ?? "");
  const [editEvent] = useEditEventMutation();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (event: EventModel) => {
    await editEvent(Event.EventModel_CreateEventModel(event));
    handleClose();
  };

  if (error) return <p>Error happened</p>;

  if (isLoading) return <p>Loading...</p>;

  if (!event) return <></>;

  return (
    <>
      <h1>{event?.title}</h1>
      <p>{event?.description}</p>
      <p>
        {event?.venue.name} - {event?.dateTime.toString()}
      </p>
      <Button variant="contained" onClick={handleOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit event</DialogTitle>
        <DialogContent>
          <CreateEditEventForm onSubmit={onSubmit} onCancel={handleClose} event={event} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventDetails;
