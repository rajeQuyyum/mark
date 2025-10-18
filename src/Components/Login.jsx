import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API =
    import.meta.env.VITE_API ||
    "http://localhost:3001" ||
    "http://localhost:2000";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    axios
      .post(`${API}/login`, { email, password })
      .then((result) => {
        if (result.data.status === "success") {
          // ✅ Save MongoDB user info
          localStorage.setItem("user", JSON.stringify(result.data.user));
          localStorage.setItem("justLoggedIn", "true");

          // ✅ Also store chat email so UserChat remembers
          localStorage.setItem("chatEmail", email);

          // ✅ Delay for 3 seconds with animation
          setTimeout(() => {
            setLoading(false);
            navigate("/home");
          }, 3000);
        } else {
          setLoading(false);
          setError(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Something went wrong. Please try again.");
      });
      
  };

  return (
    <div className="h-[100vh] jig flex items-center justify-center">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <h3>Login Here</h3>

        <label>Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="button" disabled={loading}>
          {loading ? "Logging in... wait" : "Log In"}
        </button>

        {loading && (
          <div className="mt-4 flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="social flex justify-between mt-4">
          <NavLink to="/register">
            <h4>Register</h4>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
