import React, { useState, useCallback } from "react";
import { useMutation, gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation register(
    $email: String!
    $password: String!
    $handle: String!
    $username: String!
    $role: String!
  ) {
    register(
      email: $email
      password: $password
      handle: $handle
      username: $username
      role: $role
    ) {
      id
      email
      handle
      username
      password
      role
    }
  }
`;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [handle, setHandle] = useState("");
  const [username, setUsername] = useState("");
  const role = "USER";

  const [signupMutation] = useMutation(SIGNUP_MUTATION);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (password === passwordC) {
        signupMutation({
          variables: { email, password, handle: "@" + handle, username, role },
        });
      } else {
        alert("Passwords do not match");
      }
    },
    [email, password, handle, username, role, signupMutation]
  );

  return (
    <div className="login">
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={passwordC}
          onChange={(e) => setPasswordC(e.target.value)}
        />{" "}
        <br />
        <input
          type="text"
          placeholder="Handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />{" "}
        <br />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />{" "}
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
