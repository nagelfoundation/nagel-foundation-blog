import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './components/Home';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import Category from './components/Category';
import CommentDetail from './components/CommentDetail';
import CommentList from './components/CommentList';
import AddComment from './components/AddComment';
import UpdateComment from './components/UpdateComment';
import HomePage from './login_pages/HomePage';
import LoginPage from './login_pages/LoginPage';
import SignupPage from './login_pages/SignupPage';
import { getLoggedInUser, login } from './api/UserAPI';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem("auth-user") !== 'null') {
        let response = await getLoggedInUser(localStorage.getItem("auth-user"));
        let data = await response.json();
        if (data.username) {
          setIsLoggedIn(true);
          setUser(data);
        }
      }
    }
    if (!user) {
      getUser();
    }
  }, [user])


  const handleLogin = async (evt) => {
    evt.preventDefault();
    let userObject = {
      username: evt.target.username.value,
      password: evt.target.password.value,
    }
    let response = await login(userObject);
    let data = await response.json();
    if (data.token) {
      localStorage.setItem("auth-user", `${data.token}`);
      setIsLoggedIn(true);
      setUser(data.user);
    }
  }

  const handleLogout = () => {
    localStorage.setItem("auth-user", null);
    setIsLoggedIn(false);
    setUser(null);
  }

  const renderLoginPage = () => {
    return (
      <LoginPage
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        user={user}
      />
    )
  }

  const renderHomePage = () => {
    return (
      <HomePage
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout}
      />
    )
  }

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/homepage' render={renderHomePage}/>
          <Route exact path='/login' render={renderLoginPage}/>
          <Route exact path='/signup' render={SignupPage} />
          <Route exact path='/blog' component={Blog} />
          <Route exact path='/blog/:id' component={BlogDetail} />
          <Route exact path='/category/:id' component={Category} />
          <Route exact path='/blog/:id/comments' component={CommentList} />
          <Route exact path='/blog/:id/comments/:id' component={CommentDetail} />
          <Route exact path='/add-comment' component={AddComment} />
          <Route exact path='/comments/:id/update' component={UpdateComment} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
