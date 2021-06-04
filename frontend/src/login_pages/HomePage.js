import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ isLoggedIn, user, handleLogout }) => {

  return (
    <div>
      
      {
        user &&
        <div className="p-3">
          <h1 className="display-4">
            See you soon, {user.username}!
          </h1>
        </div>
      }
      {
        !isLoggedIn
        ?
        <div className="container mt-5">
          <div>
            <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark text-center">
              <h1 className="display-4">Let's Talk!</h1>
              <div class="d-grid gap-2 col-6 mx-auto">
                <Link className="btn btn-primary btn-md" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary btn-md" to="/signup" role="button">Signup</Link>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="p-3">
          <button className="btn btn-primary btn-md mb-1" onClick={handleLogout}>Logout</button>
        </div>
      }
    </div>
  );
};

export default HomePage;