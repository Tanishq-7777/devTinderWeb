import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div className="min-h-screen sm:h-full pb-40 sm:pb-20">
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
