import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import CreateEditVenueForm from "./CreateEditVenueForm";
import { Venue, VenueModel } from "../../../app/models/venueModels";
import { useCreateVenueMutation, useEditVenueMutation } from "../venuesApi";
//import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  venue?: VenueModel;
  onSuccess?: (venue?: VenueModel) => void;
  title?: string;
}

const CreateEditVenue = ({ isOpen, onClose, venue = Venue.VenueModel(), onSuccess, title }: Props) => {
  const [createVenue] = useCreateVenueMutation();
  const [editVenue] = useEditVenueMutation();
  //const navigate = useNavigate();

  const onSubmit = async (venue: VenueModel) => {
    let newVenue: VenueModel | undefined;
    if (venue.id) {
      newVenue = (await editVenue(Venue.VenueModel_CreateVenueModel(venue))).data;
    } else {
      newVenue = (await createVenue(Venue.VenueModel_CreateVenueModel(venue))).data;
    }
    onClose();
    if (onSuccess) {
      onSuccess(newVenue);
    }
    /*if (newVenue && newVenue.data && newVenue.data.id) {
      navigate(`/venues/${newVenue.data?.id}`);
    }*/
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} maxWidth={"lg"} fullWidth>
        <DialogTitle>{title ? title : "Venue"}</DialogTitle>
        <DialogContent>
          <CreateEditVenueForm onSubmit={onSubmit} onCancel={onClose} venue={venue} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateEditVenue;
