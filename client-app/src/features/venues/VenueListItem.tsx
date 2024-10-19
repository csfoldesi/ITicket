import { Card, CardContent, Typography } from "@mui/material";
import { VenueModel } from "../../app/models/venueModels";
import { Link } from "react-router-dom";

interface Props {
  venue: VenueModel;
}

const VenueListItem = ({ venue }: Props) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" color="textPrimary">
          <Link to={`${venue.id}`}>{venue.name}</Link>
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
