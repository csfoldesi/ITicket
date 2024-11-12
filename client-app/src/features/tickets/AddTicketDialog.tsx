import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CreateTicketModel } from "../../app/models/ticketModels";
import AddTicketForm from "./AddTicketForm";
import { useCreateTicketMutation } from "./ticketsApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ticket: CreateTicketModel;
  onSuccess?: (ticket?: CreateTicketModel) => void;
  title?: string;
}

const AddTicketDialog = ({ isOpen, onClose, ticket, onSuccess, title }: Props) => {
  const [createTicket] = useCreateTicketMutation();

  const onSubmit = async (ticket: CreateTicketModel) => {
    await createTicket(ticket);
    onClose();
    if (onSuccess) {
      onSuccess(ticket);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} maxWidth={"lg"}>
        <DialogTitle>{title ? title : "Ticket"}</DialogTitle>
        <DialogContent>
          <AddTicketForm onSubmit={onSubmit} ticket={ticket} onCancel={onClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTicketDialog;
