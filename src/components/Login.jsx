import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("tani@gmail.com");
  const [password, setPassword] = useState("Tan@1234");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9999/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
    } catch (err) {
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

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
