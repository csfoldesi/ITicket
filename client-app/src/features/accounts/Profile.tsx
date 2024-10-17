import { useAppSelector } from "../../app/store/hooks";

const Profile = () => {
  const userInfo = useAppSelector((state) => state.accounts.userInfo);
  console.log(userInfo);
  if (!userInfo) {
    return <></>;
  }

  return (
    <>
      <h1>Profile</h1>
      <p>{userInfo.email}</p>
    </>
  );
};

export default Profile;
