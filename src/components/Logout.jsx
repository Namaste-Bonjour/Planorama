import { useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./CountryList.css";
import { Button } from '@mantine/core';

function Logout() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      localStorage.removeItem('user');
      alert("User logged out successfully!");
      navigate("/");
    }).catch((error) => {
      // An error happened.
      setError(error.message);
    });
  };

  return (
    <div className='logout'>
      <Button onClick={handleLogout} variant="filled" color="violet" radius="md">Logout</Button>
     
      {error && <p>{error}</p>}
    </div>
  );
}

export default Logout;