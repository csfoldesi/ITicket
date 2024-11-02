import { SubmitHandler, useForm } from "react-hook-form";
import { VenueModel } from "../../../app/models/venueModels";
import { Box, Button, TextField } from "@mui/material";

interface Props {
  onSubmit: (data: VenueModel) => void;
  onCancel?: () => void;
  venue: VenueModel;
}

const CreateEditVenueForm = ({ onSubmit: parentOnSubmit, onCancel, venue: currentVenue }: Props) => {
  const { register, handleSubmit } = useForm<VenueModel>({ defaultValues: currentVenue });

  const onSubmit: SubmitHandler<VenueModel> = (data, event) => {
    event?.preventDefault();
    parentOnSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField autoFocus required margin="normal" label="Name" fullWidth variant="standard" {...register("name")} />
      <TextField
        autoFocus
        margin="normal"
        label="Description"
        fullWidth
        multiline
        variant="standard"
        {...register("description")}
      />
      <Box>
        <TextField
          autoFocus
          required
          margin="normal"
          label="Country"
          variant="standard"
          {...register("address.country")}
        />
        <TextField
          autoFocus
          required
          margin="normal"
          label="Zip code"
          variant="standard"
          {...register("address.zipCode")}
        />
        <TextField autoFocus required margin="normal" label="City" variant="standard" {...register("address.city")} />
      </Box>
      <TextField
        autoFocus
        required
        margin="normal"
        label="Address"
        variant="standard"
        fullWidth
        {...register("address.street")}
      />
      <Box sx={{ textAlign: "right" }}>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
        <Button type="submit">Save</Button>
      </Box>
    </form>
  );
};

export default CreateEditVenueForm;
