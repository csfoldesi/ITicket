import { useNavigate } from "react-router-dom";
import { LoginDto } from "../../app/models/account";
import { useLoginMutation } from "./accountsApi";
import LoginForm from "./forms/LoginForm";

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
    <>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} />
    </>
  );
};

export default Login;
