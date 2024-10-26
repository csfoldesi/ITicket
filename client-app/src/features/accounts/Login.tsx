import { useNavigate } from "react-router-dom";
import { LoginDto } from "../../app/models/account";
import { useLoginMutation } from "./accountsApi";
import LoginForm from "./forms/LoginForm";
import { Container } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const onSubmit = async (loginData: LoginDto) => {
    const result = await login(loginData);
    if (result.data) {
      navigate("/");
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} />
    </Container>
  );
};

export default Login;
