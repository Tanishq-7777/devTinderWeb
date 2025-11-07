import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [err, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          about,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      setError("");
      console.log(res);
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
      console.log(err.message);
    }
  };
  const handleClick = () => {
    saveProfile();
  };
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {showToast && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-success">
            <span>{"Profile Updated Successfully"}</span>
          </div>
        </div>
      )}
      <div className="h-full">
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box sm:w-90 w-xs border p-4">
        <legend className="fieldset-legend">Edit Profile</legend>

        <label className="label">First Name</label>
        <input
          type="text"
          className="input"
          placeholder="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="label">Last Name</label>
        <input
          type="text"
          className="input"
          placeholder="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="label">Photo Url</label>
        <input
          type="text"
          className="input"
          placeholder="photoUrl"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <label className="label">Age</label>
        <input
          type="text"
          className="input"
          placeholder="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label className="label">About</label>
        <input
          type="text"
          className="input"
          placeholder="about"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <label className="label">Gender</label>
        <input
          type="text"
          className="input"
          placeholder="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <p className="text-red-500">{err}</p>
        <button className="btn btn-neutral mt-4" onClick={handleClick}>
          Save Profile
        </button>
      </fieldset>
    </div>
  );
};

export default EditProfile;
