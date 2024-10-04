import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./accountsApi";
import { RegisterDto } from "../../app/models/account";
import RegisterForm from "./forms/RegisterForm";

const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const onSubmit = async (registerData: RegisterDto) => {
    const result = await register(registerData);
    if (result.data) {
      navigate("/");
    }
  };

  return (
    <>
      <h1>Register</h1>
      <RegisterForm onSubmit={onSubmit} />
    </>
  );
};

export default Register;
