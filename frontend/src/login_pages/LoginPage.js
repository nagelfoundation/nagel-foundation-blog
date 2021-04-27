import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({isLoggedIn, handleLogout, handleLogin}) => {

  if (isLoggedIn) {
    return <div className="p-3">
      <button className="btn btn-primary btn-md mb-1" onClick={handleLogout}>Logout</button>
      <div>
      <Link className="btn btn-primary btn-md" to="/" role="button">Home</Link>
      </div>
    </div>
  }

  return (
    <div className="container form-floating mt-5">
      <form onSubmit={handleLogin}>
        <input className="form-control" type='text' placeholder='username' name='username' />
        <input className="form-control" type='password' name='password' />
        <button className="btn btn-primary btn-md" type='submit' >Login</button>
      </form>
    </div>
    
  );
};

export default Login;
