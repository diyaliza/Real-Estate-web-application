// Signup.js
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "../styles/signup.css"; // Import the new stylesheet

function Signup() {
  const history = useNavigate();
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setpasswordConfirmation] = useState('');
  const [userType, setUserType] = useState(''); // Set initial value to an empty string

  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/signup", {
        userId,
        name,
        email,
        password,
        passwordConfirmation,
        userType
      })
      .then((res) => {
        if (res.data.status === "failure") {
          alert("User already exists");
        } else if (res.data.status === "success") {
          history("/home", { state: { name, email, userType } });
        }
      })
      .catch((e) => {
        alert("Wrong details");
        console.log(e);
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
    <header className="header">
      <h1>RealFind</h1>
      <h3>Where you find the REAL deals.</h3>
    </header>
    <div className="signup-container">
      <h1>Signup</h1>
      <form action="POST">
      <input
          type="text"
          onChange={(e) => {
            setUserId(e.target.value);
          }}
          placeholder="UserId"
          name=""
          id=""
        ></input>
      <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
          name=""
          id=""
        ></input>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          name=""
          id=""
        ></input>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          name=""
          id=""
        ></input>
        <input
          type="password"
          onChange={(e) => {
            setpasswordConfirmation(e.target.value);
          }}
          placeholder="Confirm Password"
          name=""
          id=""
        ></input>
        <div className="form-row">
          <label htmlFor="userType">Choose user Type:</label>
          <select
            id="userType"
            name="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="">Select User Type</option> {/* Add a default option */}
            <option value="realtor">Realtor</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        <input type="submit" value="Submit" onClick={submit} />
      </form>
      <br />
      <Link to="/">Login page</Link>
    </div>
  </div>
  
  );
}

export default Signup;
