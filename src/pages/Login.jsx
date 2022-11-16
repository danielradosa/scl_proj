import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../utils/Mutations";
import { GET_CURRENT_USER } from "../utils/Queries";
import { Spinner } from "../components/Spinner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loggedInState, setLoggedInState] = useState(false);

  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });

  // set current user to local and session storage
  const handleLogin = useCallback(
    async (e, remember) => {
      e.preventDefault();
      setLoggedInState(true);
      const { data } = await loginMutation({
        variables: {
          email,
          password,
        },
      });
      if (data) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("token", data.login.token);
        storage.setItem("currentUser", JSON.stringify(data.login.allUserInfo));

        navigate("/dashboard", { replace: true });
        window.location.reload();
      }
    },
    [email, password, remember, loginMutation, navigate]
  );

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <div className="l">{loggedInState === true ? <Spinner /> : ""}</div>
        <br />
        <h2>Login</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <label>
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />{" "}
          Remember me
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
