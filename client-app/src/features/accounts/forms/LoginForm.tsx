import { SubmitHandler, useForm } from "react-hook-form";
import { LoginDto } from "../../../app/models/account";
import { Box, Button, TextField } from "@mui/material";

interface Props {
  onSubmit?: (data: LoginDto) => void;
  onCancel?: () => void;
}

const LoginForm = ({ onSubmit: parentOnSubmit, onCancel }: Props) => {
  const { register, handleSubmit } = useForm<LoginDto>();

  const onSubmit: SubmitHandler<LoginDto> = (data, event) => {
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
      <Box sx={{ textAlign: "right" }}>
        {onCancel && (
          <Button onClick={onCancel} color="secondary">
            Cancel
          </Button>
        )}
        <Button type="submit" color="primary">
          Login
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
