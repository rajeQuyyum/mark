import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // ✅ for error message
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // reset error before new attempt

    axios
      .post("http://localhost:3001/forgot-password", { email })
      .then((result) => {
        console.log(result);

        if (result.data === "success") {
          navigate("/login");
        } else {
          setError(result.data); // ✅ show backend message
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong. Please try again."); // fallback error
      });
  };

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Reset Password</h3>

        <label>Email</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        
        <button className="button">Reset</button>
        <div className="social flex justify-between">
          <NavLink to="/register">
            <h4>Register</h4>
          </NavLink>
          <NavLink to="/login"><h1 className="">Login</h1></NavLink>
        </div>
      </form>
    </>
  );
};

export default Reset;


// I specified where the errors are with good marks …..