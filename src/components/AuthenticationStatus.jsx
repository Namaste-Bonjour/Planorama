
import Logout from './Logout';
import LoginForm from './Login';
import "./Authentication.css";

function AuthStatus({user}) {

  return (
    <div>
      {user ? (
        <div className='userinfo'>
          <p>Welcome, {user.email}</p>
          <br/>
          <Logout />
        </div>
      ) : (
        <div className='userinfo'>
        <p>Please sign in</p>
        <LoginForm />
        </div>
      )}
    </div>
  );
}

export default AuthStatus;