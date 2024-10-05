import { Card, CardContent, Typography } from "@mui/material";
import { EventModel } from "../../app/models/eventModels";
import { Link } from "react-router-dom";

interface Props {
  event: EventModel;
}

const EventListItem = ({ event }: Props) => {
  return (
    <Card sx={{ minWidth: 275, margin: "1em" }} variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" color="textPrimary">
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {event.venue.name} - {event.dateTime.toString()}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {event.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventListItem;
