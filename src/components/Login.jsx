import React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './Authentication.css';
import { Button } from '@mantine/core';

function LoginForm({ user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        user = userCredential.user;
        alert('User logged in successfully!');
        navigate("/");
        // ...
      }).catch((error) => {
        alert(error.message);
        setError(error.message);
        navigate("/Register");
      });
  };

  return (
    <div className='Login'>
      <form onSubmit={Login}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />


        <Button type="submit" variant="filled" color="violet" radius="md"> Login 🔒🗝️</Button>

        {error && (
          <div>
            <p>{error}
            </p>
          </div>)
        }
      </form>
      <p className='signup'>
        New here?{' '}
        <NavLink to="/Register">
          <Button type="submit" variant="filled" color="violet" radius="md">Sign up</Button>
        </NavLink>
      </p>
    </div>
  );
}

export default LoginForm;