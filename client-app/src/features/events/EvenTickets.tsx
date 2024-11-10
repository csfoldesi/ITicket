import { useGetEventTicketsForAdministrationQuery } from "../tickets/ticketsApi";
import Error from "../core/Error";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import useDialogOpenButton from "../core/hooks/useDialogOpenButton";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  eventId: string;
}

const EventTickets = ({ eventId }: Props) => {
  const { data, error, isLoading } = useGetEventTicketsForAdministrationQuery(eventId);

  const {
    isOpen: addTicketDialogIsOpen,
    closeDialog: closeAddTicketDialog,
    OpenButton: AddTicketButton,
  } = useDialogOpenButton("Add ticket", <AddIcon />);

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <></>;

  return (
    <Card sx={{ minWidth: 275, margin: "1em" }} variant="outlined">
      <CardHeader title="Tickets" action={<AddTicketButton />} />
      <CardContent>
        {data.map((ticketType, index) => (
          <div key={index}>
            {ticketType.price} HUF - {ticketType.quantity} db
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default EventTickets;
