import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../services/apiClient.js";

const Signup = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorText, setErrorText] = useState("");

  const navigate = useNavigate();

  const attemptSignup = async () => {
    setErrorText("");

    if (!usernameValue || !emailValue || !passwordValue) {
      setErrorText("All fields are required");
      return;
    }

    try {
      await apiClient.post("/auth/signup", {
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
      });

      // after successful signup, go to login
      navigate("/");
    } catch (err) {
      setErrorText("Signup failed. Email may already exist.");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Sign Up</h2>

      <input
        placeholder="Username"
        value={usernameValue}
        onChange={(e) => setUsernameValue(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <br /><br />

      {errorText && <p style={{ color: "red" }}>{errorText}</p>}

      <button onClick={attemptSignup}>Create Account</button>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
