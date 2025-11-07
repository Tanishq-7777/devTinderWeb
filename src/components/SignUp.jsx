import { use, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const singnup = async () => {
    try {
      await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  function handleSignUp() {
    singnup();
    navigate("/login");
  }
  return (
    <div className="flex justify-center mt-10">
      <fieldset className="fieldset  bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">SignUp</legend>
        <label className="label">FristName</label>
        <input
          type="text"
          className="input"
          placeholder="FristName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="label">LastName</label>
        <input
          type="text"
          className="input"
          placeholder="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" onClick={handleSignUp}>
          SignUp
        </button>
      </fieldset>
    </div>
  );
};

export default SignUp;
