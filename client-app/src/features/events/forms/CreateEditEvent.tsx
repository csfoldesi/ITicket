import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Event, EventModel } from "../../../app/models/eventModels";
import { useCreateEventMutation, useEditEventMutation } from "../eventsApi";
import CreateEditEventForm from "./CreateEditEventForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  event?: EventModel;
  onSuccess?: (event?: EventModel) => void;
  title?: string;
}

const CreateEditEvent = ({ isOpen, onClose, event = Event.EventModel(), onSuccess, title }: Props) => {
  const [createEvent] = useCreateEventMutation();
  const [editEvent] = useEditEventMutation();

  const onSubmit = async (event: EventModel) => {
    let newEvent: EventModel | undefined;
    if (event.id) {
      newEvent = (await editEvent(Event.EventModel_CreateEventModel(event))).data;
    } else {
      newEvent = (await createEvent(Event.EventModel_CreateEventModel(event))).data;
    }
    onClose();
    if (onSuccess) {
      onSuccess(newEvent);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} maxWidth={"lg"} fullWidth>
        <DialogTitle>{title ? title : "Event"}</DialogTitle>
        <DialogContent>
          <CreateEditEventForm onSubmit={onSubmit} onCancel={onClose} event={event} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateEditEvent;
