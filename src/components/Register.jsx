import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./CountryList.css";
import { Button } from '@mantine/core';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleResgistration = async (e) => {
    e.preventDefault();
    const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    navigate("/");
  })
  . catch((error)=>{
      setError(error.message);
      console.log(error);
      alert(error.message);
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleResgistration}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
       <Button type="submit" variant="filled" color="violet" radius="md">Register 👤➕</Button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Register;