import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterDto } from "../../../app/models/account";
import { Box, Button, TextField } from "@mui/material";

interface Props {
  onSubmit?: (data: RegisterDto) => void;
  onCancel?: () => void;
}

const RegisterForm = ({ onSubmit: parentOnSubmit, onCancel }: Props) => {
  const { register, handleSubmit } = useForm<RegisterDto>();

  const onSubmit: SubmitHandler<RegisterDto> = (data, event) => {
    event?.preventDefault();
    if (parentOnSubmit) {
      parentOnSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        autoFocus
        required
        margin="normal"
        label="Email"
        fullWidth
        variant="standard"
        type="email"
        {...register("email")}
      />
      <TextField
        autoFocus
        required
        margin="normal"
        label="Password"
        fullWidth
        variant="standard"
        type="password"
        {...register("password")}
      />
      <TextField
        autoFocus
        required
        margin="normal"
        label="Password again"
        fullWidth
        variant="standard"
        type="password"
        {...register("passwordRepeat")}
      />
      <Box sx={{ textAlign: "right" }}>
        {onCancel && (
          <Button onClick={onCancel} color="secondary">
            Cancel
          </Button>
        )}
        <Button type="submit" color="primary">
          Register
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
