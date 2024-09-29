import { Box, Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/hu";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CreateEvent } from "../../../app/models/event";

interface Props {
  venueId?: string;
  onSubmit: (data: CreateEvent) => void;
  onCancel?: () => void;
}

const CreateEventForm = ({ venueId, onSubmit: parentOnSubmit, onCancel }: Props) => {
  const { register, handleSubmit, control } = useForm<CreateEvent>();

  const onSubmit: SubmitHandler<CreateEvent> = (data, event) => {
    event?.preventDefault();
    parentOnSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField autoFocus required margin="normal" label="Title" fullWidth variant="standard" {...register("title")} />
      <TextField
        autoFocus
        required
        margin="normal"
        label="Description"
        fullWidth
        multiline
        variant="standard"
        {...register("description")}
      />
      <Controller
        control={control}
        name="dateTime"
        render={({ field }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hu">
              <DateTimePicker
                views={["year", "month", "day", "hours", "minutes"]}
                label="Event date"
                inputRef={field.ref}
                ampm={false}
                sx={{ width: "100%", marginTop: "1em" }}
                onChange={(date) => {
                  field.onChange(date);
                }}
                slotProps={{
                  textField: { required: true },
                }}
              />
            </LocalizationProvider>
          );
        }}
      />
      <Box sx={{ textAlign: "right" }}>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
        <Button type="submit">Save</Button>
      </Box>
    </form>
  );
};

export default CreateEventForm;
