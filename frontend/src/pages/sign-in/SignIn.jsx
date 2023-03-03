import React from "react";
import { useState } from "react";
import "./signIn.css";
import { useNavigate } from "react-router-dom";
import {
  fetchUserToken,
  fetchUserData,
  setRemember,
} from "../../services/actions";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";


function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);

  async function login(e) {
    e.preventDefault();

    const remember = document.getElementById("remember-me").checked;
    const userLogin = { email, password };
    const token = await dispatch(fetchUserToken(userLogin));
    console.log(token)

    if (!token) {
      setInvalid(true);
      return;
    }

    setInvalid(false);
    dispatch(fetchUserData(token));

    remember
      ? setRemember(token, remember)
      : sessionStorage.setItem("token", token);

    navigate("/profile");
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={login}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              name="email"
              placeholder="email@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
        {invalid ? (
          <div className="messageConnexionError">Email ou mot de passe sont incorrects</div>
        ) : null}
      </section>
    </main>
  );
}

export default SignIn;
