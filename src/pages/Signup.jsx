import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../utils/Mutations";
import Swal from 'sweetalert2'

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
        Swal.fire({
          title: 'Success!',
          text: 'Account created successfully',
          icon: 'success',
          confirmButtonText: 'Login now'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login";
          }
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Passwords do not match',
          icon: 'error',
          confirmButtonText: 'Try again'
        })
      }
    },
    [email, password, handle, username, role, signupMutation]
  );

  return (
    <div className="mx-auto w-96 backdrop-blur-xl bg-white p-6 mt-12 rounded-xl shadow-lg">
      <h3 className="text-center text-3xl pb-4">Signup</h3>
      <form onSubmit={handleSubmit} className="grid">
        <input
          className="p-2 rounded-lg text-slate-700 border-2 border-slate-200"
          type="email"
          placeholder="E-mail"
          required
          value={email}
          minLength={6}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <input
          className="p-2 rounded-lg text-slate-700 border-2 border-slate-200"
          type="password"
          required
          placeholder="Password"
          value={password}
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <input
          className="p-2 rounded-lg text-slate-700 border-2 border-slate-200"
          type="password"
          placeholder="Confirm Password"
          value={passwordC}
          required
          minLength={6}
          onChange={(e) => setPasswordC(e.target.value)}
        />{" "}
        <br />
        <input
          className="p-2 rounded-lg text-slate-700 border-2 border-slate-200"
          type="text"
          placeholder="Handle"
          value={handle}
          minLength={4}
          required
          onChange={(e) => setHandle(e.target.value)}
        />{" "}
        <br />
        <input
          className="p-2 rounded-lg text-slate-700 border-2 border-slate-200"
          type="text"
          placeholder="Username"
          value={username}
          required
          minLength={3}
          onChange={(e) => setUsername(e.target.value)}
        />{" "}
        <br />
        <button type="submit" className="text-slate-700 rounded-lg border-2 border-slate-700 pt-2 pb-2">Create account</button>
      </form>

      <p className="text-center pt-4">
        Already have an account? <a href="/login" className="border-2 text-slate-400 rounded-lg pl-2 pr-2">Login now</a>
      </p>
    </div>
  );
};

export default Signup;
