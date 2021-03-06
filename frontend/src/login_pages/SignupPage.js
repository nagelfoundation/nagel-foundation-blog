import React from 'react';
import { signupUser } from '../api/UserAPI';

const SignupPage = (props) => {
  const { history } = props;
  const handleSignup = async (evt) => {
    evt.preventDefault();
    let userObject = {
      'username': evt.target.username.value,
      'password': evt.target.password.value,
    }
    let response = await signupUser(userObject);
    let data = await response.json();
    if (data.error) {
      console.log('there was an error signing up');
    } else {
      history.push('/login');
    }

  }

  return (
    <div className="container form-floating mt-5">
      <form onSubmit={handleSignup}>
        <input className="form-control" type='text' placeholder='RonBurgundy' name='username' />
        <input className="form-control" type='password' name='password' />
        <button className="btn btn-primary btn-md" type='submit' >Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
