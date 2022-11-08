import React, { useState, useCallback } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";


const LOGIN_MUTATION = gql`
    mutation ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
            token
        }
    }
`;

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const [loginMutation] = useMutation(LOGIN_MUTATION);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        loginMutation({ variables: { email, password } })
            .then(({ data }) => {
                const storage = remember ? localStorage : sessionStorage;
                storage.setItem('token', data.login.token);
                storage.setItem('handle', data.login.handle);
                navigate("/dashboard" , {replace:true});
            });
    }, [email, password, remember, loginMutation]);

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                <label>
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}