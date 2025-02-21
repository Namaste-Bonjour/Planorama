import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Redirect() 
{ 
    const navigate = useNavigate();
    useEffect(() => {
   
    alert("Redirecting to login page! \n Click OK to continue...");
    navigate("/Login");
    }, []);
    return;
}

export default Redirect;