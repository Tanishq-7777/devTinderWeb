import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "something went wrong");
      console.log(err.message);
    }
  };
  return (
    <div className="flex justify-center items-center my-30">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          className="input"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          placeholder="Password"
        />
        <p className="text-red-600">{err}</p>
        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
        <Link to="/signup">
          <p>New User ? SignUp here.</p>
        </Link>
      </fieldset>
    </div>
  );
};

export default Login;
