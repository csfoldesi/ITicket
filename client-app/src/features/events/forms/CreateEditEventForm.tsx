import { Box, Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/hu";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EventModel } from "../../../app/models/eventModels";
import dayjs from "dayjs";

interface Props {
  onSubmit: (data: EventModel) => void;
  onCancel?: () => void;
  event: EventModel;
}

const CreateEditEventForm = ({ onSubmit: parentOnSubmit, onCancel, event: currentEvent }: Props) => {
  const { register, handleSubmit, control } = useForm<EventModel>({ defaultValues: currentEvent });

  const onSubmit: SubmitHandler<EventModel> = (data, event) => {
    data.dateTime = dayjs(data.dateTime).toDate();
    event?.preventDefault();
    parentOnSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField margin="normal" label="Venue" fullWidth variant="standard" disabled value={currentEvent.venue.name} />
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
                defaultValue={dayjs(currentEvent.dateTime)}
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

export default CreateEditEventForm;
