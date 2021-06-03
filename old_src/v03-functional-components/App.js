import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './layout/Navbar.js';
import Alert from './layout/Alert.js';
import Users from './users/Users.js';
import User from './users/User.js';
import Search from './users/Search.js';
import About from './pages/About.js';

import './App.css';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search GitHub users
  const searchUsers = async (query) => {
    setLoadingUsers(true);
    setAlert(null);

    try {
      const res = await axios(`/api/github?query=${query}`);
      setUsers(typeof res.data.items === 'object' && Array.isArray(res.data.items) ? res.data.items : []);
      setLoadingUsers(false);
    } catch (err) {
      setAlert({ alert: { message: 'Server error', type: 'danger' } });
      console.log(err);
    }
  };

  // Get single GitHub user
  const getUser = async (username) => {
    setLoadingUser(true);
    setAlert(null);

    try {
      const res = await axios(`/api/githubuser?query=${username}`);
      setUser(res.data);
      setLoadingUser(false);
    } catch (err) {
      setAlert({ message: 'Server error', type: 'danger' });
      console.log(err);
    }
  };

  // Get user's repos
  const getUserRepos = async (username) => {
    setLoadingRepos(true);

    try {
      const res = await axios(`/api/githubrepos?user=${username}`);
      setRepos(res.data);
      setLoadingRepos(false);
    } catch (err) {
      setAlert({ message: 'Server error', type: 'danger' });
      console.log(err);
    }
  };

  // Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoadingUsers(false);
    setAlert(null);
  };

  // Set Alert
  const setAlertMessage = (message, type) => {
    setAlert({ message, type });
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0}
                    setAlert={setAlertMessage}
                  />
                  <Users users={users} loading={loadingUsers} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loadingUser || loadingRepos}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
