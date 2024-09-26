import { Card, CardContent, Typography } from "@mui/material";
import { Venue } from "../../app/models/venue";
import { Link } from "react-router-dom";

interface Props {
  venue: Venue;
}

const VenueListItem = ({ venue }: Props) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" color="textPrimary">
          <Link to={`/venues/${venue.id}`}>{venue.name}</Link>
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {venue.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {venue.address.zipCode}, {venue.address.city}, {venue.address.street}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VenueListItem;
