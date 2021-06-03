import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './layout/Navbar.js';
import Alert from './layout/Alert.js';
import Users from './users/Users.js';
import User from './users/User.js';
import Search from './users/Search.js';
import About from './pages/About.js';

import GithubState from '../context/github/GithubState';
import AlertState from '../context/alert/AlertState';

import './App.css';

const App = () => {
  return (
    <AlertState>
      <GithubState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Fragment>
                      <Search />
                      <Users />
                    </Fragment>
                  )}
                />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" render={(props) => <User {...props} />} />
              </Switch>
            </div>
          </div>
        </Router>
      </GithubState>
    </AlertState>
  );
};

export default App;
