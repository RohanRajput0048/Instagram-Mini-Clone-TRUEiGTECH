import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../services/apiClient.js";

const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  const attemptLogin = async (e) => {
    e.preventDefault();
    setErrorText("");
    try {
      const response = await apiClient.post("/auth/login", {
        email: emailValue,
        password: passwordValue,
      });
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      navigate("/feed");
    } catch (err) {
      setErrorText("Sorry, your password was incorrect.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-logo">Instagram</h1>
        <form onSubmit={attemptLogin}>
          <input
            className="auth-input"
            placeholder="Email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <button className="btn-primary" type="submit">Log in</button>
        </form>
        {errorText && <p style={{color: "red", fontSize: "14px", marginTop: "10px"}}>{errorText}</p>}
      </div>

      <div className="auth-switch">
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;