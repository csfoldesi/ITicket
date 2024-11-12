import { SubmitHandler, useForm } from "react-hook-form";
import { CreateTicketModel } from "../../app/models/ticketModels";
import { Box, Button, InputAdornment, TextField } from "@mui/material";

interface Props {
  onSubmit: (data: CreateTicketModel) => void;
  onCancel?: () => void;
  ticket: CreateTicketModel;
}

const AddTicketForm = ({ onSubmit: parentOnSubmit, onCancel, ticket }: Props) => {
  const { register, handleSubmit } = useForm<CreateTicketModel>({ defaultValues: ticket });

  const onSubmit: SubmitHandler<CreateTicketModel> = (data, event) => {
    event?.preventDefault();
    parentOnSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextField
          autoFocus
          required
          label="Price"
          variant="standard"
          sx={{ m: 1 }}
          {...register("price")}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="start">HUF</InputAdornment>,
            },
          }}
        />
        <TextField
          autoFocus
          required
          label="Quantity"
          variant="standard"
          sx={{ m: 1 }}
          {...register("quantity")}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="start">qty.</InputAdornment>,
            },
          }}
        />
      </Box>
      <Box sx={{ textAlign: "right" }}>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
        <Button type="submit">Save</Button>
      </Box>
    </form>
  );
};

export default AddTicketForm;
