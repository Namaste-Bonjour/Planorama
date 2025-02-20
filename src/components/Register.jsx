import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./CountryList.css";

function Register({setAuthenticated}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const handleResgistration = async (e) => {
    e.preventDefault();
    const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    navigate("/");
    // ...
  })
  . catch((error)=>{
      setError(error.message);
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
       <Button variant="filled" color="violet" radius="md">Register 👤➕</Button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Register;