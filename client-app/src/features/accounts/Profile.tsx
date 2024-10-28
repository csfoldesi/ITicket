//import { useAppSelector } from "../../app/store/hooks";
import { accountsApi } from "./accountsApi";
import Error from "../core/Error";
import { Container } from "@mui/material";

const Profile = () => {
  //const userInfo = useAppSelector((state) => state.accounts.userInfo);
  const { data: profile, error, isLoading } = accountsApi.useGetProfileQuery();

  if (error) {
    return <Error error={error} />;
  }
  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <h1>Profile</h1>
      <p>{profile?.email}</p>
      <p>Roles</p>
      <ul>
        {profile?.roles.map((role, index) => (
          <li key={index}>{role}</li>
        ))}
      </ul>
    </Container>
  );
};

export default Profile;
