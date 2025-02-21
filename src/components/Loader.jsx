import { Loader } from '@mantine/core';
import "./Navbar.css";

function Load() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',  
      }}
    >
      <Loader color="pink" size="xl" type="dots" />
    </div>
  );

   
}
export default Load;