import React, { useState, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
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
    refetchQueries: [GET_CURRENT_USER],
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
    <div className="mx-auto w-96 backdrop-blur-xl bg-white p-6 mt-12 rounded-xl">
      <form onSubmit={handleLogin} className="grid">
        <div className="l">{loggedInState === true ? <Spinner /> : ""}</div>
        <h2  className="text-center text-3xl pb-4">Login</h2>
        <input
        className="p-2 rounded-lg text-slate-700 border-2 border-slate-200"
          type="email"
          placeholder="E-mail"
          value={email}
          minLength={6}
          maxLength={52}
          onChange={(e) => setEmail(e.target.value)}
          required
        />{" "}
        <br />
        <input
        className="p-2 rounded-lg text-slate-700 border-2 border-slate-200"
          type="password"
          placeholder="Password"
          value={password}
          minLength={6}
          maxLength={52}
          onChange={(e) => setPassword(e.target.value)}
          required
        />{" "}
        <label>
          <input
          className="mt-5"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />{" "}
          Remember me
        </label>
        <button type="submit" className="text-slate-700 rounded-lg border-2 border-slate-700 pt-2 pb-2 mt-4">Sign in</button>
      </form>
    </div>
  );
}
